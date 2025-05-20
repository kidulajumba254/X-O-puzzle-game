"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { X, Circle, Trophy, RotateCcw, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type Player = "X" | "O"
type BoardState = (Player | null)[]
type GameHistory = {
  winner: Player | "Draw" | null
  date: Date
}

export default function TicTacToe() {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X")
  const [winner, setWinner] = useState<Player | "Draw" | null>(null)
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 })
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([])
  const [winningCombination, setWinningCombination] = useState<number[] | null>(null)
  const [gameCount, setGameCount] = useState(0)

  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ]

  useEffect(() => {
    checkWinner()
  }, [board])

  const handleClick = (index: number) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
  }

  const checkWinner = () => {
    // Check for winner
    for (const pattern of winningPatterns) {
      const [a, b, c] = pattern
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a] as Player)
        setWinningCombination(pattern)
        updateScores(board[a] as Player)
        return
      }
    }

    // Check for draw
    if (!board.includes(null) && !winner) {
      setWinner("Draw")
      updateScores("Draw")
    }
  }

  const updateScores = (result: Player | "Draw") => {
    const newScores = { ...scores }
    const newHistory = [...gameHistory]

    if (result === "Draw") {
      newScores.draws += 1
      newHistory.push({ winner: "Draw", date: new Date() })
    } else {
      newScores[result] += 1
      newHistory.push({ winner: result, date: new Date() })
    }

    setScores(newScores)
    setGameHistory(newHistory)
    setGameCount(gameCount + 1)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setWinner(null)
    setWinningCombination(null)
    // Keep the current player for the next game
  }

  const resetAll = () => {
    resetGame()
    setScores({ X: 0, O: 0, draws: 0 })
    setGameHistory([])
    setGameCount(0)
    setCurrentPlayer("X")
  }

  const renderCell = (index: number) => {
    const isWinningCell = winningCombination?.includes(index)

    return (
      <motion.div
        key={index}
        className={cn(
          "flex items-center justify-center w-full h-full rounded-lg cursor-pointer transition-all",
          "bg-white dark:bg-gray-800 shadow-md hover:shadow-lg",
          isWinningCell && "bg-green-100 dark:bg-green-900",
        )}
        whileHover={{ scale: 0.95 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleClick(index)}
      >
        {board[index] === "X" && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <X className="w-12 h-12 text-rose-500" strokeWidth={3} />
          </motion.div>
        )}
        {board[index] === "O" && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Circle className="w-10 h-10 text-teal-500" strokeWidth={3} />
          </motion.div>
        )}
      </motion.div>
    )
  }

  const getStatusMessage = () => {
    if (winner === "Draw") return "Game ended in a draw!"
    if (winner) return `Player ${winner} wins!`
    return `Player ${currentPlayer}'s turn`
  }

  const getStatusColor = () => {
    if (winner === "X") return "text-rose-500"
    if (winner === "O") return "text-teal-500"
    if (winner === "Draw") return "text-amber-500"
    return currentPlayer === "X" ? "text-rose-500" : "text-teal-500"
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="shadow-xl border-t-4 border-t-rose-400 dark:border-t-rose-600">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">Tic-Tac-Toe</CardTitle>
          <CardDescription>Challenge your friend to a game!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Game board - takes 3 columns on large screens */}
            <div className="lg:col-span-3">
              <div className="aspect-square">
                <div className="grid grid-cols-3 grid-rows-3 gap-3 h-full">
                  {Array(9)
                    .fill(null)
                    .map((_, index) => renderCell(index))}
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className={cn("text-xl font-semibold", getStatusColor())}>{getStatusMessage()}</p>
              </div>

              <div className="flex justify-center gap-3 mt-4">
                <Button onClick={resetGame} variant="outline" className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  New Game
                </Button>
                <Button onClick={resetAll} variant="destructive" className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Reset All
                </Button>
              </div>
            </div>

            {/* Score and history - takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="scores">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="scores">Scores</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="scores" className="mt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-amber-500" />
                        Points Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <X className="w-5 h-5 text-rose-500" />
                            <span className="font-medium">Player X</span>
                          </div>
                          <Badge variant="outline" className="text-lg px-3 py-1 font-bold">
                            {scores.X}
                          </Badge>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Circle className="w-5 h-5 text-teal-500" />
                            <span className="font-medium">Player O</span>
                          </div>
                          <Badge variant="outline" className="text-lg px-3 py-1 font-bold">
                            {scores.O}
                          </Badge>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="font-medium">Draws</span>
                          <Badge variant="outline" className="text-lg px-3 py-1 font-bold">
                            {scores.draws}
                          </Badge>
                        </div>

                        <div className="pt-2 border-t">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Total Games</span>
                            <Badge className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 text-lg px-3 py-1 font-bold">
                              {gameCount}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="history" className="mt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <History className="w-5 h-5" />
                        Game History
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {gameHistory.length === 0 ? (
                        <p className="text-muted-foreground text-center py-4">No games played yet</p>
                      ) : (
                        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                          {gameHistory.map((game, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">Game {index + 1}:</span>
                                <span className="font-medium">
                                  {game.winner === "Draw" ? "Draw" : `Player ${game.winner} won`}
                                </span>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {new Date(game.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <p className="text-sm text-muted-foreground">First to reach 5 points is the champion!</p>
        </CardFooter>
      </Card>
    </div>
  )
}
