import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { CitizenContextData } from "@/types/context"

export async function GET(req: Request) {
  const citizenId = req.headers.get("x-citizen-id")
  if (!citizenId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const citizen = await prisma.citizen.findUnique({
    where: { id: citizenId },
    include: {
      context:    true,
      deadlines:  { where: { completed: false } },
      actionPlan: true,
    }
  })

  if (!citizen) return NextResponse.json({ error: "Not found" }, { status: 404 })

  return NextResponse.json({
    citizen: {
      id:        citizen.id,
      firstName: citizen.firstName,
      country:   citizen.country,
      language:  citizen.language,
      email:     citizen.email,
    },
    context: {
      lifeEvent:           citizen.context?.lifeEvent,
      employment:          citizen.context?.employment,
      entitlementsJson:    citizen.context?.entitlementsJson || "[]",
      conversationSummary: citizen.context?.conversationSummary,
    },
    deadlines: citizen.deadlines.map(d => ({
      serviceId:  d.serviceId,
      title:      d.title,
      titleEs:    d.titleEs,
      dueDate:    d.dueDate.toISOString(),
      completed:  d.completed,
      reminded30: d.reminded30,
      reminded7:  d.reminded7,
      reminded1:  d.reminded1,
    })),
    actionPlan: citizen.actionPlan
      ? {
          planJson:  citizen.actionPlan.planJson,
          lifeEvent: citizen.actionPlan.lifeEvent,
          updatedAt: citizen.actionPlan.updatedAt,
        }
      : null,
  })
}
