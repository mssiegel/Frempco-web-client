// Feature flags let us ship smaller Pull Requests by allowing us to hide our
// production code behind a flag until we're ready to enable it.
interface FeatureFlag {
  enabled: boolean;
  description?: string;
}

interface FeatureFlags {}

const featureFlags: FeatureFlags = {};

export default featureFlags;
