import random

word_list = ["aardvark", "baboon", "camel"]
chosen_word = random.choice(word_list)
display = ["_"] * len(chosen_word)

print(" ".join(display))

while "_" in display:
    guess = input("Unesi slovo: ").lower()

    for i in range(len(chosen_word)):
        if chosen_word[i] == guess:
            display[i] = guess

    print(" ".join(display))

print("Bravo! Riječ je bila:", chosen_word)
