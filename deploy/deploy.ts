import { deployContract } from "./utils";
export default async function () {
  const contractArtifactName = "Freelance";
  const constructorArguments = [];
  await deployContract(contractArtifactName, constructorArguments);
}