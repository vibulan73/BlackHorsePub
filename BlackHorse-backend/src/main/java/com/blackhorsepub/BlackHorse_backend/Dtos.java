package com.blackhorsepub.BlackHorse_backend;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

record LoginRequest(@NotBlank String username, @NotBlank String password) {}
record LoginResponse(String token) {}
record NewsletterRequest(@Email @NotBlank String email) {}
record OpenMicRegistrationRequest(@NotBlank String userName, @Email @NotBlank String email, @NotNull Long eventId) {}
record ReservationSlotsResponse(LocalDate date, List<String> availableSlots) {}
record ReservationStatusRequest(@NotNull ReservationStatus status) {}
