const updateReputation = async (userId, delta) => {
  const user = await this.userRepository.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  user.reputation += delta;

  // Passage automatique EXPERT
  if (user.reputation >= 10 && user.role === "USER") {
    user.role = "EXPERT";
  }

  return await this.userRepository.save(user);
}