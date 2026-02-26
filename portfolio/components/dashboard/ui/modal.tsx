"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImagePlus, X, Link as LinkIcon } from "lucide-react"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"

export function ProjectModal({ trigger }: { trigger: React.ReactNode }) {
  const [tools, setTools] = useState<string[]>([])
  const [currentTool, setCurrentTool] = useState("")

  const addTool = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentTool.trim()) {
      e.preventDefault()
      setTools([...tools, currentTool.trim()])
      setCurrentTool("")
    }
  }

  const removeTool = (index: number) => {
    setTools(tools.filter((_, i) => i !== index))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Project Details</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="en" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="az">Azerbaijani</TabsTrigger>
            <TabsTrigger value="ru">Russian</TabsTrigger>
            <TabsTrigger value="en">English</TabsTrigger>
          </TabsList>

          {/* Render content for each language */}
          {["en", "az", "ru"].map((lang) => (
            <TabsContent key={lang} value={lang} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Project Title ({lang.toUpperCase()})</Label>
                <Input placeholder="Enter title..." />
              </div>
              <div className="space-y-2">
                <Label>Description ({lang.toUpperCase()})</Label>
                <Textarea placeholder="Describe the project..." className="min-h-[100px]" />
              </div>
              <div className="space-y-2">
                <Label>Role ({lang.toUpperCase()})</Label>
                <Input placeholder="e.g. Lead Developer" />
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <Separator className="my-4" />

        {/* Global Fields (Tools, Links, Images) */}
        <div className="grid gap-6">
          {/* Tools Field */}
          <div className="space-y-2">
            <Label>Tools & Technologies (English Only)</Label>
            <Input 
              placeholder="Type tool and press Enter" 
              value={currentTool}
              onChange={(e) => setCurrentTool(e.target.value)}
              onKeyDown={addTool}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {tools.map((tool, i) => (
                <span key={i} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  {tool}
                  <X className="size-3 cursor-pointer" onClick={() => removeTool(i)} />
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Project Link</Label>
              <div className="flex gap-2">
                <div className="flex size-10 items-center justify-center rounded-md border bg-muted"><LinkIcon className="size-4" /></div>
                <Input placeholder="https://..." />
              </div>
            </div>
            <div className="space-y-2">
              <Label>GitHub Repository</Label>
              <Input placeholder="https://github.com/..." />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Project Images</Label>
            <div className="grid grid-cols-4 gap-4">
              <button className="flex aspect-square flex-col items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/25 transition-colors hover:border-primary/50">
                <ImagePlus className="size-6 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground mt-1">Upload</span>
              </button>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button type="submit" className="w-full md:w-auto">Save Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}