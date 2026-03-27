// Feature flags let us ship smaller Pull Requests by allowing us to hide our
// production code behind a flag until we're ready to enable it.
interface FeatureFlag {
  enabled: boolean;
  description?: string;
}

const featureFlags: Record<string, FeatureFlag> = {
  isChooseGameRoomSettingsBeforeGettingPinLaunched: {
    enabled: false,
    description:
      'This feature will let Teachers choose their Game Room settings such as characters and email etc. before getting a Game Room PIN.',
  },
};

export default featureFlags;
