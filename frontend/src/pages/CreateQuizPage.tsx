import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import QuizTitle from "../components/create-quiz/QuizTitle";
import QuestionsStep from "../components/create-quiz/QuestionsStep";
import QuizSummaryStep from "../components/create-quiz/QuizSummary";
import type { QuestionType } from "../components/create-quiz/QuizCard";
import { useNavigate } from "react-router-dom";
import { createQuiz } from "../api/quiz";
import { getQuestions } from "../utils/getQuestions";
import type { OptionType } from "../components/create-quiz/OptionCard";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Footer from "../components/common/Footer";
import { saveQuizToStorage } from "../utils/storage";

export default function CreateQuizPage() {
  const [step, setStep] = useState(0);
  interface QuizData {
    title: string;
    description: string;
    questions: QuestionType[];
  }

  const buildPresetQuestions = (
    category: "normal" | "cute" | "spicy" | "playful" | "deep"
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
    category: "normal" | "cute" | "spicy" | "playful" | "deep"
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
  const [quizId, setQuizId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
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
      setQuizId(data.quiz_id);
      setToken(data.token);
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
      (q) => q.correct_option === null
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
      <div className="flex flex-col justify-center items-center w-full min-h-screen bg-background text-foreground outer-pad">
        <div className="w-full max-w-6xl">
        <div className="mb-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground mb-2">
            <div className="inline-flex items-center gap-2">
              <span>Step {step + 1} of 3</span>
              <span>{Math.round(((step + 1) / 3) * 100)}%</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="rounded-full"
              >
                Home
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setStep(3)}
                className="rounded-full"
              >
                Review
              </Button>
            </div>
          </div>
          <div className="bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary h-full"
              style={{ width: `${((step + 1) / 3) * 100}%` }}
            />
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold font-display">LoveMeter</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Design a loving quiz for your special someone.
          </p>
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

                {showPresets && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowPresets(false)}
                    />
                    <div className="fixed right-6 top-28 z-50 bg-card border border-border rounded-2xl p-3 shadow-sm w-72">
                    <div className="text-sm text-muted-foreground mb-2">
                      Load preset questions
                    </div>
                    {quizData.questions.length > 0 && (
                      <>
                        <div className="text-xs text-muted-foreground mb-2">
                          Replace current questions or add to them?
                        </div>
                        <div className="flex gap-2 mb-3">
                          <Button
                            size="sm"
                            variant={presetMode === "replace" ? "primary" : "secondary"}
                            onClick={() => setPresetMode("replace")}
                          >
                            Replace
                          </Button>
                          <Button
                            size="sm"
                            variant={presetMode === "add" ? "primary" : "secondary"}
                            onClick={() => setPresetMode("add")}
                          >
                            Add
                          </Button>
                        </div>
                      </>
                    )}
                    <div className="flex flex-col gap-2">
                      {(
                        [
                          { key: "normal", label: "normal" },
                          { key: "cute", label: "cute" },
                          { key: "spicy", label: "spicy" },
                          { key: "playful", label: "playful" },
                          { key: "deep", label: "deep" },
                        ] as const
                      ).map((cat) => (
                        <Button
                          key={cat.key}
                          size="sm"
                          variant="secondary"
                          className="w-full"
                          onClick={() => applyPreset(cat.key)}
                        >
                          <span className="capitalize">{cat.label}</span>
                        </Button>
                      ))}
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Max questions: 14
                    </div>
                    </div>
                  </>
                )}

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

        <div className="flex gap-2 mt-6 justify-center flex-wrap">
          {step > 0 && (
            <Button variant="secondary" onClick={back}>
              Back
            </Button>
          )}
          {step < 2 && (
            <Button onClick={next}>
              Next
            </Button>
          )}
        </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
