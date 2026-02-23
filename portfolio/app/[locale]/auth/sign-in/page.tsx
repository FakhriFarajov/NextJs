"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"
import SilkBg from "@/components/ui/silk";
import { useTranslations } from "next-intl";

export default function SignIn() {
  const t = useTranslations();
  const handleSignIn = async () => {
    await signIn("github", { callbackUrl: "/dashboard" })
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>{t("signIn.title")}</CardTitle>
            <CardDescription>{t("signIn.description")}</CardDescription>
            <CardAction>
              <Button variant="link">{t("signIn.signup")}</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">{t("signIn.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("signIn.emailPlaceholder")}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">{t("signIn.password")}</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      {t("signIn.forgotPassword")}
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              {t("signIn.login")}
            </Button>
            <Button variant="outline" className="w-full" onClick={handleSignIn}>
              {t("signIn.loginGithub")}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
