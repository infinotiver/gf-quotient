import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import QuizTitle from "../components/QuizTitle";
import QuestionsStep from "../components/QuestionsStep";
import QuizSummaryStep from "../components/QuizSummary";
import PresetPicker from "../components/PresetPicker";
import type { QuestionType } from "../components/QuizCard";
import { useNavigate } from "react-router-dom";
import { createQuiz } from "../api";
import { getQuestions } from "../utils/getQuestions";
import type { OptionType } from "../components/OptionCard";
import Button from "@components/common/Button";
import Card from "@components/common/Card";
import FloatingActionBar from "@components/common/FloatingActionBar";
import Footer from "@components/common/Footer";
import { saveQuizToStorage } from "@utils/storage";
import TopNav from "@components/common/TopNav";

export default function CreateQuizPage() {
  const [step, setStep] = useState(0);
  interface QuizData {
    title: string;
    description: string;
    questions: QuestionType[];
  }

  const buildPresetQuestions = (
    category: "normal" | "cute" | "spicy" | "playful" | "deep",
  ): QuestionType[] => {
    const preset = getQuestions(category);
    return preset.map((q) => {
      const options: OptionType[] = [
        { id: 1, text: "" },
        { id: 2, text: "" },
        { id: 3, text: "" },
        { id: 4, text: "" },
      ];
      return {
        text: q.question,
        options,
        correct_option: null,
      };
    });
  };

  const applyPreset = (
    category: "normal" | "cute" | "spicy" | "playful" | "deep",
  ) => {
    const preset = buildPresetQuestions(category);
    setQuizData((p) => {
      const merged =
        presetMode === "replace" ? preset : [...p.questions, ...preset];
      return { ...p, questions: merged.slice(0, 14) };
    });
    setShowPresets(false);
    setNotice(null);
  };

  const [quizData, setQuizData] = useState<QuizData>({
    title: "",
    description: "",
    questions: [],
  });

  const [notice, setNotice] = useState<string | null>(null);
  const [showPresets, setShowPresets] = useState(false);
  const [presetMode, setPresetMode] = useState<"add" | "replace">("add");

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (data: typeof quizData) => {
      const response = await createQuiz(data);
      return response;
    },
    onSuccess: (data) => {
      saveQuizToStorage({
        quiz_id: data.quiz_id,
        token: data.token,
        title: quizData.title || "Untitled quiz",
        created_at: new Date().toISOString(),
      });
      // navigate to share page and pass quizId + token
      navigate(`/quiz/share/${data.quiz_id}`, { state: { token: data.token } });
    },
    onError: (error) => {
      alert(error);
    },
  });

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));

  const handleSubmit = () => {
    if (quizData.questions.length === 0) {
      setNotice("Please add at least one question before creating your quiz.");
      return;
    }
    const missingCorrect = quizData.questions.some(
      (q) => q.correct_option === null,
    );
    if (missingCorrect) {
      setNotice("Please select a correct answer for every question.");
      return;
    }
    setNotice(null);
    const formattedQuizData = {
      ...quizData,
      questions: quizData.questions.map((q) => ({
        text: q.text,
        options: q.options.map(({ id, text }) => ({ id, text })), // Remove nested correct_option
        correct_option: q.correct_option, // Send correct_option at question level
      })),
    };
    mutation.mutate(formattedQuizData);
  };

    return (
    <>
      <div className="min-h-screen bg-background text-foreground outer-pad pb-28">
        <div className="w-full max-w-5xl mx-auto flex flex-col stack-gap-lg">
          <TopNav
            links={[{ label: "Home", to: "/", variant: "ghost" }]}
            actions={[
              {
                label: "Review",
                onClick: () => setStep(3),
                variant: "secondary",
              },
            ]}
          />
          <div className="mb-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground mb-2">
              <div className="inline-flex items-center gap-2">
                <span>Step {step + 1} of 3</span>
                <span>{Math.round(((step + 1) / 3) * 100)}%</span>
              </div>
            </div>
            <div className="bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="bg-primary h-full"
                style={{ width: `${((step + 1) / 3) * 100}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 stack-gap-lg">
            <Card>
              {step === 0 && (
                <QuizTitle
                  onTitleChange={(value: string) =>
                    setQuizData((prev) => ({ ...prev, title: value }))
                  }
                  onDescriptionChange={(value: string) =>
                    setQuizData((prev) => ({ ...prev, description: value }))
                  }
                />
              )}

              {step === 1 && (
                <div className="flex flex-col gap-3 relative">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm text-muted-foreground">
                      Start with a preset, then edit freely.
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setShowPresets((v) => !v)}
                    >
                      Load preset questions
                    </Button>
                  </div>

                  <PresetPicker
                    open={showPresets}
                    hasQuestions={quizData.questions.length > 0}
                    presetMode={presetMode}
                    onClose={() => setShowPresets(false)}
                    onModeChange={setPresetMode}
                    onPick={applyPreset}
                  />

                  <QuestionsStep
                    questions={quizData.questions}
                    setQuizData={setQuizData}
                  />
                </div>
              )}
              {step === 2 && (
                <div className="mt-4">
                  <QuizSummaryStep data={quizData} onSubmit={handleSubmit} />
                </div>
              )}
            </Card>
          </div>

          {notice && (
            <div className="mt-4 text-center text-sm text-destructive">
              {notice}
            </div>
          )}

        </div>
      </div>
      {(step > 0 || step < 2) && (
        <FloatingActionBar>
          {step > 0 && (
            <Button variant="secondary" onClick={back}>
              Back
            </Button>
          )}
          {step < 2 && <Button onClick={next}>Next</Button>}
        </FloatingActionBar>
      )}
      <Footer />
    </>
  );
}
