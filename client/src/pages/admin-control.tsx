import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { HelpTopic, BasicsInstruction, Website, Feedback } from "@shared/schema";

const ADMIN_PASSWORD = "BusinessDawg2025SyncHQ💎";

export default function AdminControlPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"help" | "basics" | "websites">("help");
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    url: "",
    websiteUrl: "",
    favicon: "",
    image: "",
  });

  const { data: helpTopics = [] } = useQuery<HelpTopic[]>({
    queryKey: ["/api/help-topics"],
    enabled: isAuthenticated,
  });

  const { data: basicsInstructions = [] } = useQuery<BasicsInstruction[]>({
    queryKey: ["/api/basics"],
    enabled: isAuthenticated,
  });

  const { data: websites = [] } = useQuery<Website[]>({
    queryKey: ["/api/websites"],
    enabled: isAuthenticated,
  });

  const { data: feedback = [] } = useQuery<Feedback[]>({
    queryKey: ["/api/feedback"],
    enabled: isAuthenticated,
    retry: false,
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      let endpoint = "";
      if (activeCategory === "help") {
        endpoint = "/api/help-topics";
      } else if (activeCategory === "basics") {
        endpoint = "/api/basics";
      } else {
        endpoint = "/api/websites";
      }

      return apiRequest(endpoint, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Password": ADMIN_PASSWORD,
        },
      });
    },
    onSuccess: () => {
      if (activeCategory === "help") {
        queryClient.invalidateQueries({ queryKey: ["/api/help-topics"] });
      } else if (activeCategory === "basics") {
        queryClient.invalidateQueries({ queryKey: ["/api/basics"] });
      } else {
        queryClient.invalidateQueries({ queryKey: ["/api/websites"] });
      }
      setShowAddDialog(false);
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ endpoint, id }: { endpoint: string; id: string }) => {
      return apiRequest(`${endpoint}/${id}`, {
        method: "DELETE",
        headers: {
          "X-Admin-Password": ADMIN_PASSWORD,
        },
      });
    },
    onSuccess: (_, variables) => {
      if (variables.endpoint === "/api/help-topics") {
        queryClient.invalidateQueries({ queryKey: ["/api/help-topics"] });
      } else if (variables.endpoint === "/api/basics") {
        queryClient.invalidateQueries({ queryKey: ["/api/basics"] });
      } else {
        queryClient.invalidateQueries({ queryKey: ["/api/websites"] });
      }
    },
  });

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      console.log('Admin authenticated');
    } else {
      alert('Incorrect password');
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      content: "",
      url: "",
      websiteUrl: "",
      favicon: "",
      image: "",
    });
  };

  const handleSubmit = () => {
    if (activeCategory === "help") {
      createMutation.mutate({
        title: formData.title,
        description: formData.description,
        content: formData.content,
      });
    } else if (activeCategory === "basics") {
      createMutation.mutate({
        title: formData.title,
        description: formData.description,
        content: formData.content,
        websiteUrl: formData.websiteUrl,
        favicon: formData.favicon || null,
      });
    } else {
      createMutation.mutate({
        title: formData.title,
        description: formData.description,
        url: formData.url,
        image: formData.image || null,
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" data-testid="page-admin-login">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Admin Control Panel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Enter admin password"
                data-testid="input-admin-password"
              />
            </div>
            <Button className="w-full" onClick={handleLogin} data-testid="button-admin-login">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8" data-testid="page-admin-control">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Admin Control Panel</h1>
        <p className="text-muted-foreground">Manage website content and settings</p>
      </div>

      <Tabs defaultValue="help" onValueChange={(v) => setActiveCategory(v as any)}>
        <TabsList className="mb-6">
          <TabsTrigger value="help" data-testid="tab-help">Help Topics</TabsTrigger>
          <TabsTrigger value="basics" data-testid="tab-basics">Basics Instructions</TabsTrigger>
          <TabsTrigger value="websites" data-testid="tab-websites">Websites</TabsTrigger>
          <TabsTrigger value="feedback" data-testid="tab-feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="help">
          <Card>
            <CardHeader>
              <CardTitle>Help Topics ({helpTopics.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {helpTopics.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No help topics yet</p>
                ) : (
                  helpTopics.map((topic) => (
                    <div key={topic.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">{topic.title}</p>
                        <p className="text-sm text-muted-foreground">{topic.description}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteMutation.mutate({ endpoint: "/api/help-topics", id: topic.id })}
                        data-testid="button-delete-topic"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="basics">
          <Card>
            <CardHeader>
              <CardTitle>Basics Instructions ({basicsInstructions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {basicsInstructions.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No instructions yet</p>
                ) : (
                  basicsInstructions.map((instruction) => (
                    <div key={instruction.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">{instruction.title}</p>
                        <p className="text-sm text-muted-foreground">{instruction.websiteUrl}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteMutation.mutate({ endpoint: "/api/basics", id: instruction.id })}
                        data-testid="button-delete-instruction"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="websites">
          <Card>
            <CardHeader>
              <CardTitle>Websites Portfolio ({websites.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {websites.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No websites yet</p>
                ) : (
                  websites.map((website) => (
                    <div key={website.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">{website.title}</p>
                        <p className="text-sm text-muted-foreground">{website.url}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteMutation.mutate({ endpoint: "/api/websites", id: website.id })}
                        data-testid="button-delete-website"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>User Feedback ({feedback.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {feedback.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No feedback yet</p>
                ) : (
                  feedback.map((item) => (
                    <div key={item.id} className="p-3 border rounded-md">
                      <p className="font-medium">Page: {item.pageId}</p>
                      <p className="text-sm text-muted-foreground">
                        Helpful: {item.isHelpful ? "Yes" : "No"}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button
        size="lg"
        className="fixed bottom-6 right-6 rounded-full shadow-xl h-14 w-14"
        onClick={() => setShowAddDialog(true)}
        data-testid="button-add-content"
      >
        <Plus className="h-6 w-6" />
      </Button>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Add New {activeCategory === 'help' ? 'Topic' : activeCategory === 'basics' ? 'Instruction' : 'Website'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                data-testid="input-content-title"
              />
            </div>
            
            {activeCategory === "websites" ? (
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  placeholder="https://example.com"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  data-testid="input-website-url"
                />
              </div>
            ) : null}

            {activeCategory === "basics" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="websiteUrl">Website URL</Label>
                  <Input
                    id="websiteUrl"
                    placeholder="https://example.com"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    data-testid="input-website-url"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="favicon">Favicon (emoji or URL)</Label>
                  <Input
                    id="favicon"
                    placeholder="🌐"
                    value={formData.favicon}
                    onChange={(e) => setFormData({ ...formData, favicon: e.target.value })}
                    data-testid="input-favicon"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                data-testid="textarea-content-description"
              />
            </div>

            {activeCategory !== "websites" && (
              <div className="space-y-2">
                <Label htmlFor="content">Content (HTML supported)</Label>
                <Textarea
                  id="content"
                  placeholder="Enter content (you can use HTML)"
                  rows={10}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  data-testid="textarea-content-body"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowAddDialog(false);
                resetForm();
              }}
              data-testid="button-cancel-add"
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} data-testid="button-save-content">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
