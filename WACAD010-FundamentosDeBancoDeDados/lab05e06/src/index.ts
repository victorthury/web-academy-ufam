import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  await prisma.clientes.create({
    data: {
      cpf: "52762469040",
      nome: "John Doe",
      celular: "92999999999",
      dataDeNascimento: new Date(1998, 10, 15),
      enderecos: {
        create: {
          cep: "00000000",
          rua: "Rua dos Alfeneiros",
          numero: "4",
          bairro: "Vieiralves",
          cidade: "Manaus",
          estado: "AM",
        },
      },
    },
  });

  const user = await prisma.clientes.findUnique({
    where: { cpf: "52762469040" },
    include: {
      enderecos: true,
    },
  });

  console.dir(user, { depth: null });

  const users = await prisma.clientes.findMany({
    where: { cpf: "52762469040" },
    include: {
      enderecos: true,
    },
  });

  console.dir(users, { depth: null });

  const updateUser = await prisma.clientes.update({
    where: {
      cpf: "52762469040",
    },
    data: {
      celular: "92888888888",
    },
  });

  console.log(updateUser);
  const deleteAddresses = prisma.enderecos.deleteMany({
    where: {
      cpfCliente: "52762469040",
    },
  });

  const deleteUser = prisma.clientes.delete({
    where: {
      cpf: "52762469040",
    },
  });

  await prisma.$transaction([deleteAddresses, deleteUser]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
