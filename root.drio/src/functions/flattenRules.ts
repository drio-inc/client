import type { Rule } from "@/state/slices/contractRuleSlice";

export interface FlattenedRule {
  id: string;
  name: string;
  action: string;
  dataset: string;
  subrule_id: string;
  defaultAllow: boolean;
  subrule_value: string;
  subrule_subrule: string;
  subrule_metadata: string;
  subrule_conditions: string;
}

export const transformContractRules = (rules: Rule[]) => {
  const flattenedArray: FlattenedRule[] = [];

  rules?.forEach((rule) => {
    rule?.subrules?.forEach((subrule) => {
      const flattenedRule: FlattenedRule = {
        id: rule.id ?? "",
        name: rule.name ?? "",
        action: rule.action ?? "",
        dataset: rule.dataset ?? "",
        subrule_value: subrule.value,
        subrule_id: subrule.id ?? "",
        subrule_subrule: subrule.subrule,
        subrule_metadata: subrule.metadata,
        subrule_conditions: subrule.conditions,
        defaultAllow: rule.defaultAllow ?? false,
      };

      flattenedArray.push(flattenedRule);
    });
  });

  return flattenedArray;
};
