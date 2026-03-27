import { useAuthStore } from '../store/authStore';
import { PLAN_FEATURES, PLANS } from '../constants/planFeatures';

export function usePlan() {
  const user = useAuthStore((s) => s.user);
  const plan = user?.plan || PLANS.FREE;
  const features = PLAN_FEATURES[plan] || PLAN_FEATURES[PLANS.FREE];

  const hasFeature = (featureKey) => {
    return !!features[featureKey];
  };

  return { plan, features, hasFeature };
}
