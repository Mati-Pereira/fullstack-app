import { compare } from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.json({ message: "Método não permitido" });
  }
  let user = await prisma.users.findUnique({
    where: {
      username: req.body.username,
    },
  });
  if (!user) {
    user = { username: "", password: "", accountId: 0, id: 0 };
  }
  const isPasswordMatch = await compare(req.body.password, user.password);
  if (!user || !isPasswordMatch) {
    return res.json({ message: "Usuário e/ou senha incorretos" });
  } else {
    return res.json({ message: "Usuário logado com sucesso" });
  }
}
