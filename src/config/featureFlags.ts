// Feature flags let us ship smaller Pull Requests by allowing us to hide our
// production code behind a flag until we're ready to enable it.
interface FeatureFlag {
  enabled: boolean;
  description?: string;
}

interface FeatureFlags {
  isStudentEndChatButtonLaunched: FeatureFlag;
}

const featureFlags: FeatureFlags = {
  isStudentEndChatButtonLaunched: {
    enabled: false,
    description:
      'Shows the student end-chat button on Students page and enables associated behavior.',
  },
};

export default featureFlags;
