package com.blackhorsepub.BlackHorse_backend;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByFeaturedTrueOrderByDateAscTimeAsc();
    List<Event> findByDateOrderByTimeAsc(LocalDate date);
}

interface OpenMicEventRepository extends JpaRepository<OpenMicEvent, Long> {
    List<OpenMicEvent> findByDateGreaterThanEqualOrderByDateAsc(LocalDate date);
}

interface OpenMicRegistrationRepository extends JpaRepository<OpenMicRegistration, Long> {
    long countByEventId(Long eventId);
}

interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByDateOrderByTimeSlotAsc(LocalDate date);
    boolean existsByDateAndTimeSlotAndStatus(LocalDate date, String timeSlot, ReservationStatus status);
}

interface BeerRepository extends JpaRepository<Beer, Long> {}

interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByCategoryIgnoreCaseOrderByNameAsc(String category);
}

interface OrderRepository extends JpaRepository<Order, Long> {}

interface NewsArticleRepository extends JpaRepository<NewsArticle, Long> {}

interface MediaItemRepository extends JpaRepository<MediaItem, Long> {}

interface NewsletterSubscriberRepository extends JpaRepository<NewsletterSubscriber, Long> {
    Optional<NewsletterSubscriber> findByEmailIgnoreCase(String email);
}
