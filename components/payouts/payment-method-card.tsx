import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface PaymentMethodCardProps {
  method: {
    id: string
    type: "bank" | "upi" | "paypal"
    name: string
    details: string
    isDefault?: boolean
  }
}

export default function PaymentMethodCard({ method }: PaymentMethodCardProps) {
  return (
    <Card className={method.isDefault ? "border-primary" : ""}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              {method.type === "bank" && (
                <img src="/placeholder.svg?height=24&width=24&text=Bank" alt="Bank" className="h-6 w-6" />
              )}
              {method.type === "upi" && (
                <img src="/placeholder.svg?height=24&width=24&text=UPI" alt="UPI" className="h-6 w-6" />
              )}
              {method.type === "paypal" && (
                <img src="/placeholder.svg?height=24&width=24&text=PayPal" alt="PayPal" className="h-6 w-6" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium">{method.name}</p>
                {method.isDefault && (
                  <Badge variant="outline" className="text-xs">
                    Default
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{method.details}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              {!method.isDefault && <DropdownMenuItem>Set as Default</DropdownMenuItem>}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}

