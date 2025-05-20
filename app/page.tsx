import TicTacToe from "@/components/tic-tac-toe"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-rose-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
      <TicTacToe />
    </main>
  )
}
