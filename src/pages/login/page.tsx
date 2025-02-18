import { useSignIn } from "@/apis/useSignIn"
import { Button } from "@/components/Button"
import { Card } from "@/components/shadcn/card"
import { Input } from "@/components/shadcn/input"
import { useToast } from "@/hooks/useToast"
import userStore from "@/store/user"
import { useEffect, useState } from "react"

export default function Page() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  })
  const { mutate: signIn } = useSignIn()

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInput((prev) => ({ ...prev, [name]: value }))
  }
  const handleClickLoginButton = () => {
    signIn({ signname: input.email, password: input.password })
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      signIn({ signname: input.email, password: input.password })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">로그인</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              이메일
            </label>
            <Input
              name="email"
              value={input.email}
              onChange={handleChangeInput}
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              className="mt-1 block w-full"
              onKeyDown={handleKeyDown}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <Input
              name="password"
              value={input.password}
              onChange={handleChangeInput}
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="mt-1 block w-full"
              onKeyDown={handleKeyDown}
            />
          </div>

          <Button
            className="w-full mt-4 py-2 text-lg"
            onClick={handleClickLoginButton}
            disabled={!input.email || !input.password}
          >
            로그인
          </Button>
        </div>
      </Card>
    </div>
  )
}
