"use client"

import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Dumbbell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Login() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") === "register" ? "register" : "login";

  return (
    <>
      <motion.div
        className="flex flex-col justify-center p-8 md:p-12"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto w-full max-w-sm">
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="login" className="flex-1">
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="flex-1">
                Register
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold">Welcome to FitCircuit</h1>
                  <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="username">Username</label>
                    <Input id="username" placeholder="Enter your username" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="password">Password</label>
                    <Input id="password" type="password" placeholder="Enter your password" />
                  </div>
                  <Button className="w-full bg-[#4CAF50] hover:bg-[#45a049]">Login</Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="register">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold">Create an Account</h1>
                  <p className="text-sm text-muted-foreground">Enter your details to create your account</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="register-email">Email</label>
                    <Input id="register-email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="register-username">Username</label>
                    <Input id="register-username" placeholder="Choose a username" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="register-password">Password</label>
                    <Input id="register-password" type="password" placeholder="Choose a password" />
                  </div>
                  <Button className="w-full bg-[#4CAF50] hover:bg-[#45a049]">Register</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>

      <motion.div
        className="hidden md:flex flex-col items-center justify-center p-8 bg-[#f0f7f0] text-center"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Dumbbell className="w-16 h-16 text-[#4CAF50] mb-6" />
        <h2 className="text-3xl font-bold text-[#4CAF50] mb-4">FitCircuit</h2>
        <p className="text-muted-foreground max-w-sm">
          Your personalized fitness journey starts here. Get AI-powered workout plans and nutrition guidance tailored to
          your goals.
        </p>
      </motion.div>
    </>
  )
}
