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
import { useEffect, useState } from "react"
import { Separator } from "@/components/ui/separator"
import { useTranslations } from "next-intl"

interface ProjectModalProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialData?: any;
}

export function ProjectModal({ trigger, open, onOpenChange, initialData }: ProjectModalProps) {
  const t = useTranslations("dashboard.modalProjects")
  const [tools, setTools] = useState<string[]>([])
  const [currentTool, setCurrentTool] = useState("")
  const [titles, setTitles] = useState<{ [key: string]: string }>({ en: "", az: "", ru: "" })
  const [descriptions, setDescriptions] = useState<{ [key: string]: string }>({ en: "", az: "", ru: "" })
  const [roles, setRoles] = useState<{ [key: string]: string }>({ en: "", az: "", ru: "" })
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    if (initialData) {
      setTitles({
        en: initialData.title?.en || "",
        az: initialData.title?.az || "",
        ru: initialData.title?.ru || ""
      })
      setDescriptions({
        en: initialData.description?.en || "",
        az: initialData.description?.az || "",
        ru: initialData.description?.ru || ""
      })
      setRoles({
        en: initialData.role?.en || "",
        az: initialData.role?.az || "",
        ru: initialData.role?.ru || ""
      })
      setTools(initialData.tools || [])
      setImages(initialData.images || [])
    } else {
      setTitles({ en: "", az: "", ru: "" })
      setDescriptions({ en: "", az: "", ru: "" })
      setRoles({ en: "", az: "", ru: "" })
      setTools([])
      setImages([])
    }
  }, [initialData])

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const urls = files.map(file => URL.createObjectURL(file))
    setImages([...images, ...urls])
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="en" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="az">{t("tabs.az")}</TabsTrigger>
            <TabsTrigger value="ru">{t("tabs.ru")}</TabsTrigger>
            <TabsTrigger value="en">{t("tabs.en")}</TabsTrigger>
          </TabsList>
          {["en", "az", "ru"].map((lang) => (
            <TabsContent key={lang} value={lang} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>{t("fields.title", { lang: lang.toUpperCase() })}</Label>
                <Input placeholder={t("placeholders.title")}
                  value={titles[lang]}
                  onChange={e => setTitles({ ...titles, [lang]: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>{t("fields.description", { lang: lang.toUpperCase() })}</Label>
                <Textarea placeholder={t("placeholders.description")}
                  value={descriptions[lang]}
                  onChange={e => setDescriptions({ ...descriptions, [lang]: e.target.value })}
                  className="min-h-[100px]" />
              </div>
              <div className="space-y-2">
                <Label>{t("fields.role", { lang: lang.toUpperCase() })}</Label>
                <Input placeholder={t("placeholders.role")}
                  value={roles[lang]}
                  onChange={e => setRoles({ ...roles, [lang]: e.target.value })}
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <Separator className="my-4" />
        {/* Global Fields (Tools, Links, Images) */}
        <div className="grid gap-6">
          {/* Tools Field */}
          <div className="space-y-2">
            <Label>{t("fields.tools")}</Label>
            <Input 
              placeholder={t("placeholders.tools")}
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
              <Label>{t("fields.projectLink")}</Label>
              <div className="flex gap-2">
                <div className="flex size-10 items-center justify-center rounded-md border bg-muted"><LinkIcon className="size-4" /></div>
                <Input placeholder={t("placeholders.projectLink")}/>
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t("fields.github")}</Label>
              <Input placeholder={t("placeholders.github")}/>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("fields.images")}</Label>
            <div className="grid grid-cols-4 gap-4">
              <div className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted" style={{ paddingBottom: 4 }}>
                {images.map((img, idx) => (
                  <div key={idx} className="relative flex flex-col items-center justify-center w-28 h-28 aspect-square rounded-md border">
                    <img src={img} alt="Project" className="object-cover w-full h-full rounded-md" />
                    <button className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1" onClick={() => removeImage(idx)}>
                      <X className="size-3" />
                    </button>
                  </div>
                ))}
                <label className="flex w-28 h-28 aspect-square flex-col items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/25 transition-colors hover:border-primary/50 cursor-pointer">
                  <ImagePlus className="size-7 text-muted-foreground mb-2 mt-2" />
                  <span className="text-[10px] text-muted-foreground mt-1">{t("actions.upload")}</span>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
                </label>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="mt-6">
          <Button type="submit" className="w-full md:w-auto">{t("actions.save")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}