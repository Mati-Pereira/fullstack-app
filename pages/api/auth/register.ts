import { hash } from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.json({ message: "Método não peremitido" });
  }
  const isUserAlreadyExists = await prisma.users.findFirst({
    where: { username: req.body.username },
  });
  if (isUserAlreadyExists) {
    return res.json({ message: "Usuário já existe" });
  }
  const hashedPassword = await hash(req.body.password, 8);
  const account = prisma.accounts.create({
    data: {},
  });

  await prisma.users
    .create({
      data: {
        username: req.body.username,
        password: hashedPassword,
        accountId: (await account).id,
      },
    })
    .then(() => {
      res.json({ message: "Usuário criado com sucesso" });
    })
    .catch((e) => {
      res.json({ message: e.message });
    });
}
