import { Button, Card, Input } from "@/components/ui"

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">로그인</h2>
        <form>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                이메일
              </label>
              <Input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                className="mt-1 block w-full"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                className="mt-1 block w-full"
              />
            </div>

            <Button className="w-full mt-4 py-2 text-lg">로그인</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
