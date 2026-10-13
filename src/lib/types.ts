export type PricingPlanDto = {
  id: string; name: string; description: string; is_pro: boolean;
  benefits: string[]; code_types: string[]; tech_tools: string[];
};