import { convertToPascalCase } from "../../utils";
import { jsonLdContextTypeMap, LdContextPlus, LdContextPlusLeafNode, SchemaMetadata } from "./VcSchema";
import { CompletedSchema } from "./types";

/** Adding `niceName` so that we can know what type to show in type selection dropdown. */
type NamedLdContextPlusNode = Partial<LdContextPlusLeafNode> & { niceName?: string };

export const typeOptions: { [key: string]: NamedLdContextPlusNode } = {};
Object.keys(jsonLdContextTypeMap).forEach((type) => {
  if (type.indexOf("http://schema.org/") !== 0) {
    return;
  }
  typeOptions[type] = {
    "@format": jsonLdContextTypeMap[type].format,
    "@dataType": jsonLdContextTypeMap[type].type,
    "@type": type,
    niceName: type.replace("http://schema.org/", ""),
  };
});

export function createLdContextPlusSchema(schema: CompletedSchema): LdContextPlus<SchemaMetadata> {
  const schemaTypeName = convertToPascalCase(schema.name);
  const schemaProperties: { [key: string]: LdContextPlusLeafNode } = {};

  schema.properties.forEach((prop) => {
    schemaProperties[prop["@id"]] = {
      ...prop,
      "@id": `schema-id:${prop["@id"]}`,
    };
  });

  return {
    "@context": {
      "@metadata": {
        slug: schema.slug,
        version: schema.version,
        icon: schema.icon,
        discoverable: schema.discoverable,
      },
      "@title": schema.name,
      "@description": schema.description,
      w3ccred: "https://www.w3.org/2018/credentials#",
      "schema-id": `https://uport.me/schema/${schema.slug}#`, // @TODO/tobek ensure this matches up with API
      "@rootType": schemaTypeName,
      [schemaTypeName]: {
        "@id": "schema-id",
        "@contains": "credentialSubject",
      },
      credentialSubject: {
        "@id": "w3ccred:credentialSubject",
        "@required": true,
        "@context": schemaProperties,
      },
    },
  };
}
