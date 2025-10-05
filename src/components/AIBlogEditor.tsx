import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Tag, 
  Lightbulb, 
  Edit3, 
  CheckCircle,
  Loader2,
  Wand2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AIBlogEditorProps {
  onContentChange?: (content: string) => void;
  onTagsChange?: (tags: string[]) => void;
  onTitleChange?: (title: string) => void;
}

const AIBlogEditor = ({ 
  onContentChange, 
  onTagsChange, 
  onTitleChange 
}: AIBlogEditorProps) => {
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [suggestedTitles, setSuggestedTitles] = useState<string[]>([]);
  const [improvements, setImprovements] = useState<string>('');

  const generateAutoTags = async () => {
    if (!content.trim()) {
      toast({
        title: "No content",
        description: "Please write some content first.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai-assistant/blog/auto-tag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ content })
      });

      if (response.ok) {
        const data = await response.json();
        setSuggestedTags(data.tags);
        toast({
          title: "Tags generated",
          description: "AI has suggested relevant tags for your content."
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate tags",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateTitleSuggestions = async () => {
    if (!content.trim()) {
      toast({
        title: "No content",
        description: "Please write some content first.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai-assistant/blog/suggest-titles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ content })
      });

      if (response.ok) {
        const data = await response.json();
        setSuggestedTitles(data.titles);
        toast({
          title: "Titles generated",
          description: "AI has suggested engaging titles for your content."
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate titles",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const getContentImprovements = async () => {
    if (!content.trim()) {
      toast({
        title: "No content",
        description: "Please write some content first.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai-assistant/blog/improve-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ content })
      });

      if (response.ok) {
        const data = await response.json();
        setImprovements(data.improvements);
        toast({
          title: "Improvements ready",
          description: "AI has analyzed your content and provided suggestions."
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get improvements",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      const newTags = [...tags, tag];
      setTags(newTags);
      onTagsChange?.(newTags);
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    onTagsChange?.(newTags);
  };

  const useTitle = (title: string) => {
    setTitle(title);
    onTitleChange?.(title);
  };

  return (
    <div className="space-y-6">
      {/* Title Input */}
      <div className="space-y-2">
        <Label htmlFor="title">Article Title</Label>
        <div className="flex space-x-2">
          <Input
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              onTitleChange?.(e.target.value);
            }}
            placeholder="Enter your article title..."
            className="flex-1"
          />
          <Button
            variant="outline"
            onClick={generateTitleSuggestions}
            disabled={isGenerating || !content.trim()}
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Content Editor */}
      <div className="space-y-2">
        <Label htmlFor="content">Article Content</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            onContentChange?.(e.target.value);
          }}
          placeholder="Write your article content here..."
          rows={10}
          className="resize-none"
        />
      </div>

      {/* AI Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>AI Writing Assistant</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              onClick={generateAutoTags}
              disabled={isGenerating || !content.trim()}
              className="flex items-center space-x-2"
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Tag className="h-4 w-4" />
              )}
              <span>Auto Tags</span>
            </Button>

            <Button
              variant="outline"
              onClick={generateTitleSuggestions}
              disabled={isGenerating || !content.trim()}
              className="flex items-center space-x-2"
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Edit3 className="h-4 w-4" />
              )}
              <span>Suggest Titles</span>
            </Button>

            <Button
              variant="outline"
              onClick={getContentImprovements}
              disabled={isGenerating || !content.trim()}
              className="flex items-center space-x-2"
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Lightbulb className="h-4 w-4" />
              )}
              <span>Improve Content</span>
            </Button>
          </div>

          {/* Suggested Tags */}
          {suggestedTags.length > 0 && (
            <div className="space-y-2">
              <Label>Suggested Tags</Label>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => addTag(tag)}
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Suggested Titles */}
          {suggestedTitles.length > 0 && (
            <div className="space-y-2">
              <Label>Suggested Titles</Label>
              <div className="space-y-2">
                {suggestedTitles.map((title, index) => (
                  <div
                    key={index}
                    className="p-2 border rounded-lg cursor-pointer hover:bg-muted/50"
                    onClick={() => useTitle(title)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{title}</span>
                      <Button size="sm" variant="ghost">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Content Improvements */}
          {improvements && (
            <div className="space-y-2">
              <Label>Content Improvements</Label>
              <div className="p-4 bg-muted/50 rounded-lg">
                <pre className="text-sm whitespace-pre-wrap">{improvements}</pre>
              </div>
            </div>
          )}

          {/* Current Tags */}
          {tags.length > 0 && (
            <div className="space-y-2">
              <Label>Current Tags</Label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="default"
                    className="cursor-pointer"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIBlogEditor;
