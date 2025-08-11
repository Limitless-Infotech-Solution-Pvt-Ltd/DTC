import { ArrowDownLeft, ArrowUpRight } from "lucide-react"

interface TransactionItemProps {
  type: "deposit" | "withdrawal"
  amount: string
  date: string
  status: "pending" | "completed" | "failed"
  description: string
}

export default function TransactionItem({ type, amount, date, status, description }: TransactionItemProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <div className="flex items-center gap-3">
        <div className={`rounded-full p-2 ${type === "deposit" ? "bg-green-100" : "bg-muted"}`}>
          {type === "deposit" ? (
            <ArrowDownLeft className="h-4 w-4 text-green-600" />
          ) : (
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
        <div>
          <p className="font-medium">{description}</p>
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-medium ${type === "deposit" ? "text-green-600" : ""}`}>
          {type === "deposit" ? "+" : "-"}${amount}
        </p>
        <p className="text-xs text-muted-foreground capitalize">{status}</p>
      </div>
    </div>
  )
}

