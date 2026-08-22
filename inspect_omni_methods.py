import inspect
from omnivoice import OmniVoice, VoiceClonePrompt

print("OmniVoice.from_pretrained signature:")
print(inspect.signature(OmniVoice.from_pretrained))

print("\nOmniVoice methods:")
for m in dir(OmniVoice):
    if not m.startswith("_"):
        print(" -", m)

print("\nVoiceClonePrompt init signature:")
print(inspect.signature(VoiceClonePrompt.__init__))
