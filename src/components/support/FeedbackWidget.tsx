import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Send, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export const FeedbackWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      toast({
        title: "Feedback required",
        description: "Please enter your feedback before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Feedback submitted",
      description: "Thank you! Your feedback helps us improve Orchesity.",
    });
    
    setFeedback("");
    setRating(0);
    setIsOpen(false);
    setIsSubmitting(false);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          variant="hero"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-80 glass border-border/20 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-lg">Send Feedback</CardTitle>
            <CardDescription className="text-sm">
              Help us improve Orchesity
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Rating */}
          <div>
            <p className="text-sm font-medium mb-2">How would you rate your experience?</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`h-4 w-4 ${
                      star <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </Button>
              ))}
            </div>
          </div>

          {/* Feedback */}
          <div>
            <p className="text-sm font-medium mb-2">Your feedback</p>
            <Textarea
              placeholder="Tell us what you think about Orchesity..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-20 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              size="sm"
              className="flex-1"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send className="h-3 w-3 mr-1" />
                  Send
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};