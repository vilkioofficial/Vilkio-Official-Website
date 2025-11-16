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

const ADMIN_PASSWORD = "BusinessDawg2025SyncHQ💎";

export default function AdminControlPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"help" | "basics" | "websites">("help");

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      console.log('Admin authenticated');
    } else {
      alert('Incorrect password');
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
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Help Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <p className="font-medium">Getting Started</p>
                      <p className="text-sm text-muted-foreground">Learn the basics...</p>
                    </div>
                    <Button variant="ghost" size="icon" data-testid="button-delete-topic">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="basics">
          <Card>
            <CardHeader>
              <CardTitle>Basics Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Manage website instructions and keyboard shortcuts</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="websites">
          <Card>
            <CardHeader>
              <CardTitle>Websites Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Manage showcased websites</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>User Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <p className="font-medium">Help: Getting Started</p>
                    <p className="text-sm text-muted-foreground">Helpful: Yes - 12 votes</p>
                  </div>
                </div>
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
            <DialogTitle>Add New {activeCategory === 'help' ? 'Topic' : activeCategory === 'basics' ? 'Instruction' : 'Website'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter title" data-testid="input-content-title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter description" data-testid="textarea-content-description" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" placeholder="Enter content" rows={10} data-testid="textarea-content-body" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)} data-testid="button-cancel-add">
              Cancel
            </Button>
            <Button onClick={() => {
              console.log('Content added');
              setShowAddDialog(false);
            }} data-testid="button-save-content">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
