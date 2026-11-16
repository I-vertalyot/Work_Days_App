// Creates the key pair Convex Auth uses to sign people in.
// Run by the "Deploy Convex" GitHub workflow; the keys go straight into
// Convex's settings and are never stored in the repository.
import { exportJWK, exportPKCS8, generateKeyPair } from "jose";
import { writeFileSync } from "node:fs";

const keys = await generateKeyPair("RS256", { extractable: true });
const privateKey = await exportPKCS8(keys.privateKey);
const publicKey = await exportJWK(keys.publicKey);
const jwks = JSON.stringify({ keys: [{ use: "sig", ...publicKey }] });

writeFileSync(".jwt_private", privateKey.trimEnd().replace(/\n/g, " "));
writeFileSync(".jwks", jwks);
