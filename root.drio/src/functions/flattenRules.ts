import type { Rule } from "@/state/slices/policiesSlice";

export interface FlattenedRule {
  id: string;
  name: string;
  action: string;
  dataset: string;
  subrule_id: string;
  defaultAllow: string;
  subrule_value: string;
  subrule_subrule: string;
  subrule_metadata: string;
  subrule_conditions: string;
}

export const transformPolicyRules = (rules: Rule[]) => {
  const flattenedArray: FlattenedRule[] = [];

  rules?.forEach((rule) => {
    rule?.subrules.forEach((subrule) => {
      const flattenedRule: FlattenedRule = {
        id: rule.id,
        name: rule.name,
        dataset: rule.dataset,
        subrule_id: subrule.id,
        action: rule.action ?? "",
        subrule_value: subrule.value,
        defaultAllow: rule.defaultAllow,
        subrule_subrule: subrule.subrule,
        subrule_metadata: subrule.metadata,
        subrule_conditions: subrule.conditions,
      };

      flattenedArray.push(flattenedRule);
    });
  });

  return flattenedArray;
};
