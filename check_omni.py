import omnivoice
import inspect

print("OmniVoice attributes:")
for name in dir(omnivoice):
    if not name.startswith("_"):
        print(" -", name)
