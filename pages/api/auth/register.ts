import { hash } from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (!req.body) {
    res.statusCode = 404;
    res.end("Error");
    return;
  }

  if (req.method === "POST") {
    const checkUserExist = await prisma.users.findFirst({
      where: req.body.username,
    });
    if (checkUserExist) {
      res.json({ message: "Usuário já existe" });
    }
    const hashedPassoword = await hash(req.body.password, 8);
    await prisma.users.create({
      data: {
        username: req.body.username,
        password: hashedPassoword,
      },
    });
    return res.status(201).json({ message: "Usuário criado com sucesso" });
  }
}
