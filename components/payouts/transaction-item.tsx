import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

interface TransactionItemProps {
  transaction: {
    id: string
    type: "deposit" | "withdrawal"
    amount: number
    status: "completed" | "pending" | "failed"
    date: string
    method: string
    details: string
    error?: string
  }
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  return (
    <div className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
      <div className="flex items-start gap-4">
        <div
          className={`rounded-full p-2 ${
            transaction.type === "deposit" ? "bg-green-500/10 text-green-500" : "bg-blue-500/10 text-blue-500"
          }`}
        >
          {transaction.type === "deposit" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 19 7-7-7-7" />
              <path d="M19 12H5" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          )}
        </div>
        <div className="space-y-1">
          <p className="font-medium">{transaction.type === "deposit" ? "Deposit" : "Withdrawal"}</p>
          <p className="text-sm text-muted-foreground">
            {transaction.method} • {transaction.details}
          </p>
          {transaction.error && <p className="text-xs text-destructive">{transaction.error}</p>}
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">
          {transaction.type === "deposit" ? "+" : "-"}₹{transaction.amount.toLocaleString("en-IN")}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(transaction.date), { addSuffix: true })}
        </p>
        <div className="mt-1">
          {transaction.status === "completed" && <Badge className="bg-green-500">Completed</Badge>}
          {transaction.status === "pending" && <Badge className="bg-yellow-500">Pending</Badge>}
          {transaction.status === "failed" && <Badge variant="destructive">Failed</Badge>}
        </div>
      </div>
    </div>
  )
}

