import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Repeat2, 
  MoreHorizontal,
  Send,
  Eye,
  Calendar,
  Clock,
  User
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface SocialBlogCardProps {
  article: {
    _id: string;
    title: string;
    content: string;
    authorId: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      avatar?: string;
    };
    tags?: string[];
    image?: string;
    likes: string[];
    comments: Array<{
      _id: string;
      userId: string;
      content: string;
      createdAt: string;
      likes: string[];
    }>;
    reposts: Array<{
      _id: string;
      userId: string;
      comment?: string;
      createdAt: string;
    }>;
    shares: string[];
    viewCount: number;
    createdAt: string;
    isRepost?: boolean;
    originalArticleId?: string;
  };
  onLike?: (articleId: string) => void;
  onComment?: (articleId: string, content: string) => void;
  onRepost?: (articleId: string, comment?: string) => void;
  onShare?: (articleId: string) => void;
}

const SocialBlogCard = ({ 
  article, 
  onLike, 
  onComment, 
  onRepost, 
  onShare 
}: SocialBlogCardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(
    user ? article.likes.includes(user._id) : false
  );
  const [isReposted, setIsReposted] = useState(
    user ? article.reposts.some(repost => repost.userId === user._id) : false
  );

  const handleLike = async () => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to like articles.",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch('/api/blog/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ articleId: article._id })
      });

      if (response.ok) {
        const result = await response.json();
        setIsLiked(result.liked);
        onLike?.(article._id);
        toast({
          title: result.liked ? "Liked!" : "Unliked",
          description: result.message
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to like article",
        variant: "destructive"
      });
    }
  };

  const handleComment = async () => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to comment.",
        variant: "destructive"
      });
      return;
    }

    if (!commentText.trim()) return;

    try {
      const response = await fetch('/api/blog/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ 
          articleId: article._id, 
          content: commentText 
        })
      });

      if (response.ok) {
        setCommentText('');
        onComment?.(article._id, commentText);
        toast({
          title: "Comment added",
          description: "Your comment has been posted."
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive"
      });
    }
  };

  const handleRepost = async () => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to repost articles.",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch('/api/blog/repost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ articleId: article._id })
      });

      if (response.ok) {
        setIsReposted(true);
        onRepost?.(article._id);
        toast({
          title: "Reposted!",
          description: "Article has been reposted to your timeline."
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to repost article",
        variant: "destructive"
      });
    }
  };

  const handleShare = async () => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to share articles.",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch('/api/blog/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ articleId: article._id })
      });

      if (response.ok) {
        onShare?.(article._id);
        toast({
          title: "Shared!",
          description: "Article has been shared successfully."
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to share article",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={article.authorId.avatar} />
              <AvatarFallback>
                {article.authorId.firstName[0]}{article.authorId.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold">
                  {article.authorId.firstName} {article.authorId.lastName}
                </h4>
                {article.isRepost && (
                  <Badge variant="outline" className="text-xs">
                    <Repeat2 className="h-3 w-3 mr-1" />
                    Repost
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                <Clock className="h-3 w-3 ml-2" />
                <span>{new Date(article.createdAt).toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h3 className="text-xl font-bold mb-2">{article.title}</h3>
          <p className="text-muted-foreground line-clamp-3">{article.content}</p>
        </div>

        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center space-x-2 ${
                isLiked ? 'text-red-500' : 'text-muted-foreground'
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{article.likes.length}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 text-muted-foreground"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{article.comments.length}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleRepost}
              className={`flex items-center space-x-2 ${
                isReposted ? 'text-green-500' : 'text-muted-foreground'
              }`}
            >
              <Repeat2 className={`h-4 w-4 ${isReposted ? 'fill-current' : ''}`} />
              <span>{article.reposts.length}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="flex items-center space-x-2 text-muted-foreground"
            >
              <Share2 className="h-4 w-4" />
              <span>{article.shares.length}</span>
            </Button>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Eye className="h-4 w-4" />
            <span>{article.viewCount}</span>
          </div>
        </div>

        {showComments && (
          <div className="space-y-4 pt-4 border-t">
            <div className="space-y-3">
              {article.comments.map((comment) => (
                <div key={comment._id} className="flex space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-sm">{comment.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-2">
              <Textarea
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1"
                rows={2}
              />
              <Button onClick={handleComment} disabled={!commentText.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SocialBlogCard;
