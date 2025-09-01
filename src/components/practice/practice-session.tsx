"use client";

import { useState, useRef, useEffect } from "react";
import { useFormState } from "react-dom";
import { Mic, Square, Loader2, Star, ThumbsDown, Video, VideoOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getInterviewFeedback } from "@/app/practice/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const interviewQuestions = [
  "Tell me about yourself.",
  "Why are you interested in this university?",
  "What are your strengths and weaknesses?",
  "Where do you see yourself in 5 years?",
  "Describe a challenge you've overcome.",
];

type RecordingState = "idle" | "recording" | "processing" | "finished" | "error";

export function PracticeSession() {
  const { toast } = useToast();
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(interviewQuestions[0]);
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [audioDataUri, setAudioDataUri] = useState<string>("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const [state, formAction] = useFormState(getInterviewFeedback, {});

  useEffect(() => {
    if (state.analysis) {
      setRecordingState("finished");
    } else if (state.error) {
      setRecordingState("error");
    }
  }, [state]);

  const toggleCamera = async () => {
    if (isCameraOn) {
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach((track) => track.stop());
      videoRef.current!.srcObject = null;
      setIsCameraOn(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        videoRef.current!.srcObject = stream;
        setIsCameraOn(true);
      } catch (err) {
        console.error("Error accessing media devices.", err);
        toast({
          variant: "destructive",
          title: "Permission Denied",
          description: "Could not access camera and microphone. Please check your browser permissions.",
        });
      }
    }
  };

  const startRecording = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          setAudioDataUri(reader.result as string);
          setRecordingState("processing");
        };
        audioChunksRef.current = [];
      };
      mediaRecorderRef.current.start();
      setRecordingState("recording");
    } else {
      toast({ title: "Camera is off", description: "Please turn on your camera and microphone first." });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  };

  useEffect(() => {
    if (recordingState === "processing" && audioDataUri) {
      const formData = new FormData();
      formData.append("audioDataUri", audioDataUri);
      formData.append("question", selectedQuestion);
      formAction(formData);
    }
  }, [recordingState, audioDataUri, selectedQuestion, formAction]);

  const resetSession = () => {
    setRecordingState("idle");
    setAudioDataUri("");
    state.analysis = undefined;
    state.error = undefined;
    state.formErrors = undefined;
  };

  return (
    <section className="w-full py-12 md:py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Interview Practice Session</h1>
          <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl">
            Select a question, record your answer, and get instant AI feedback.
          </p>
        </div>

        {recordingState === "idle" || recordingState === "recording" ? (
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>1. Setup Your Practice</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Interview Question</label>
                    <Select value={selectedQuestion} onValueChange={setSelectedQuestion} disabled={recordingState === 'recording'}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a question" />
                      </SelectTrigger>
                      <SelectContent>
                        {interviewQuestions.map((q) => (
                          <SelectItem key={q} value={q}>{q}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={toggleCamera} variant="outline" className="w-full">
                    {isCameraOn ? <VideoOff className="mr-2 h-4 w-4" /> : <Video className="mr-2 h-4 w-4" />}
                    {isCameraOn ? "Turn Camera Off" : "Turn Camera & Mic On"}
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>2. Record Your Response</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center p-6">
                  {recordingState === 'recording' ? (
                    <Button onClick={stopRecording} size="lg" variant="destructive" className="h-16 w-16 rounded-full">
                      <Square className="h-6 w-6" />
                    </Button>
                  ) : (
                    <Button onClick={startRecording} size="lg" disabled={!isCameraOn} className="h-16 w-16 rounded-full">
                      <Mic className="h-6 w-6" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="overflow-hidden">
                <div className="bg-black aspect-video flex items-center justify-center text-muted-foreground">
                  <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover"></video>
                  {!isCameraOn && <div className="flex flex-col items-center gap-2"><VideoOff className="h-16 w-16" /><span>Camera is off</span></div>}
                </div>
              </Card>
            </div>
          </div>
        ) : recordingState === 'processing' ? (
            <div className="flex flex-col items-center justify-center text-center gap-4 py-16">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <h2 className="text-2xl font-semibold">Analyzing your response...</h2>
                <p className="text-muted-foreground">Our AI is working its magic. This might take a moment.</p>
            </div>
        ) : (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold">Your Feedback</h2>
              <p className="text-muted-foreground">Here's the AI analysis of your response to: "{selectedQuestion}"</p>
            </div>

            {state.error && (
              <Alert variant="destructive" className="mb-8">
                <AlertTitle>Analysis Failed</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}

            {state.analysis && (
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader><CardTitle>Overall Feedback</CardTitle></CardHeader>
                  <CardContent><p className="text-muted-foreground">{state.analysis.overallFeedback}</p></CardContent>
                </Card>
                <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                  <CardHeader className="flex-row items-center gap-2 space-y-0">
                    <Star className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <CardTitle>Strengths</CardTitle>
                  </CardHeader>
                  <CardContent><p className="text-muted-foreground">{state.analysis.strengths}</p></CardContent>
                </Card>
                <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
                  <CardHeader className="flex-row items-center gap-2 space-y-0">
                    <ThumbsDown className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    <CardTitle>Areas for Improvement</CardTitle>
                  </CardHeader>
                  <CardContent><p className="text-muted-foreground">{state.analysis.weaknesses}</p></CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle>Sentiment Analysis</CardTitle></CardHeader>
                  <CardContent><p className="text-muted-foreground">{state.analysis.sentimentAnalysis}</p></CardContent>
                </Card>
                 <Card>
                  <CardHeader><CardTitle>Keyword Analysis</CardTitle></CardHeader>
                  <CardContent><p className="text-muted-foreground">{state.analysis.keywordAnalysis}</p></CardContent>
                </Card>
              </div>
            )}
            <div className="mt-8 text-center">
              <Button onClick={resetSession} size="lg">Practice Another Question</Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
