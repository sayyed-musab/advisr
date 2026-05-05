import { useState, useRef, useEffect } from 'react';
import { useConsultStore } from '../../store/consultStore.js';
import { Button } from '../ui/Button.jsx';
import { Input } from '../ui/Input.jsx';
import { Send, User, Bot } from 'lucide-react';

export const FollowupChat = ({ sessionId, followups = [] }) => {
  const [question, setQuestion] = useState('');
  const { sendFollowup, isLoading } = useConsultStore();
  const bottomRef = useRef(null);

  // Scroll to bottom when followups change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [followups]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const q = question;
    setQuestion('');
    
    try {
      await sendFollowup(sessionId, q);
    } catch (error) {
      // Input is preserved if you want to implement it, or just show toast from store/component
      setQuestion(q);
    }
  };

  return (
    <div className="flex flex-col h-[500px] rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      <div className="bg-gray-50 p-4 border-b border-gray-200">
        <h3 className="font-bold text-gray-900">Follow-up Questions</h3>
        <p className="text-xs text-gray-500">Ask our AI consultant for clarification or more details.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {followups.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm text-gray-400">
            No questions asked yet. Feel free to ask below!
          </div>
        ) : (
          followups.map((f, idx) => (
            <div key={idx} className="space-y-4">
              {/* User Question */}
              <div className="flex justify-end items-start gap-2">
                <div className="bg-black text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%] text-sm">
                  {f.question}
                </div>
                <div className="h-8 w-8 rounded-full bg-gray-200 flex flex-shrink-0 items-center justify-center">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
              </div>
              
              {/* AI Answer */}
              <div className="flex justify-start items-start gap-2">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex flex-shrink-0 items-center justify-center">
                  <Bot className="h-4 w-4 text-purple-600" />
                </div>
                <div className="bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] text-sm whitespace-pre-wrap shadow-sm">
                  {f.answer}
                </div>
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex justify-start items-start gap-2 animate-pulse">
            <div className="h-8 w-8 rounded-full bg-purple-100 flex flex-shrink-0 items-center justify-center">
              <Bot className="h-4 w-4 text-purple-600" />
            </div>
            <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-500">
              Consultant is typing...
            </div>
          </div>
        )}
        
        <div ref={bottomRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !question.trim()} size="icon" className="shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};
