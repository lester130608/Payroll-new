import { authOptions } from "./authOptions";
import { getServerSession as getSession } from "next-auth";

export const getServerSession = () => getSession(authOptions);
