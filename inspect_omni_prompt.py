import inspect
from omnivoice import OmniVoice

print("create_voice_clone_prompt signature:")
print(inspect.signature(OmniVoice.create_voice_clone_prompt))

print("\ngenerate signature:")
print(inspect.signature(OmniVoice.generate))
