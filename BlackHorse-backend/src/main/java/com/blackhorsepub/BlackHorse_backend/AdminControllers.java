package com.blackhorsepub.BlackHorse_backend;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
class AdminEventController {
    private final EventRepository repository;
    AdminEventController(EventRepository repository) { this.repository = repository; }
    @GetMapping("/admin/events") List<Event> all() { return repository.findAll(); }
    @PostMapping("/admin/events") @ResponseStatus(HttpStatus.CREATED) Event create(@Valid @RequestBody Event item) { item.setId(null); return repository.save(item); }
    @PutMapping("/admin/events/{id}") Event update(@PathVariable Long id, @Valid @RequestBody Event item) { item.setId(id); require(repository, id); return repository.save(item); }
    @DeleteMapping("/admin/events/{id}") void delete(@PathVariable Long id) { repository.deleteById(id); }
    private <T> void require(JpaRepository<T, Long> repo, Long id) { if (!repo.existsById(id)) throw new ResponseStatusException(HttpStatus.NOT_FOUND); }
}

@RestController
class AdminOpenMicController {
    private final OpenMicEventRepository events;
    private final OpenMicRegistrationRepository registrations;
    AdminOpenMicController(OpenMicEventRepository events, OpenMicRegistrationRepository registrations) { this.events = events; this.registrations = registrations; }
    @GetMapping("/admin/open-mic/events") List<OpenMicEvent> allEvents() { return events.findAll(); }
    @PostMapping("/admin/open-mic/events") @ResponseStatus(HttpStatus.CREATED) OpenMicEvent create(@Valid @RequestBody OpenMicEvent item) { item.setId(null); return events.save(item); }
    @PutMapping("/admin/open-mic/events/{id}") OpenMicEvent update(@PathVariable Long id, @Valid @RequestBody OpenMicEvent item) { item.setId(id); if (!events.existsById(id)) throw new ResponseStatusException(HttpStatus.NOT_FOUND); return events.save(item); }
    @DeleteMapping("/admin/open-mic/events/{id}") void delete(@PathVariable Long id) { events.deleteById(id); }
    @GetMapping("/admin/open-mic/registrations") List<OpenMicRegistration> registrations() { return registrations.findAll(); }
}

@RestController
class AdminReservationController {
    private final ReservationRepository reservations;
    AdminReservationController(ReservationRepository reservations) { this.reservations = reservations; }
    @GetMapping("/admin/reservations") List<Reservation> all() { return reservations.findAll(); }
    @PutMapping("/admin/reservations/{id}") Reservation updateStatus(@PathVariable Long id, @Valid @RequestBody ReservationStatusRequest request) {
        Reservation reservation = reservations.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (request.status() == ReservationStatus.APPROVED
                && reservations.existsByDateAndTimeSlotAndStatus(reservation.getDate(), reservation.getTimeSlot(), ReservationStatus.APPROVED)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Slot is already approved for another reservation");
        }
        reservation.setStatus(request.status());
        return reservations.save(reservation);
    }
}

@RestController
class AdminBeerController {
    private final BeerRepository repository;
    AdminBeerController(BeerRepository repository) { this.repository = repository; }
    @GetMapping("/admin/beers") List<Beer> all() { return repository.findAll(); }
    @PostMapping("/admin/beers") @ResponseStatus(HttpStatus.CREATED) Beer create(@Valid @RequestBody Beer item) { item.setId(null); return repository.save(item); }
    @PutMapping("/admin/beers/{id}") Beer update(@PathVariable Long id, @Valid @RequestBody Beer item) { item.setId(id); return repository.save(item); }
    @DeleteMapping("/admin/beers/{id}") void delete(@PathVariable Long id) { repository.deleteById(id); }
}

@RestController
class AdminMenuController {
    private final MenuItemRepository repository;
    AdminMenuController(MenuItemRepository repository) { this.repository = repository; }
    @GetMapping("/admin/menu-items") List<MenuItem> all() { return repository.findAll(); }
    @PostMapping("/admin/menu-items") @ResponseStatus(HttpStatus.CREATED) MenuItem create(@Valid @RequestBody MenuItem item) { item.setId(null); return repository.save(item); }
    @PutMapping("/admin/menu-items/{id}") MenuItem update(@PathVariable Long id, @Valid @RequestBody MenuItem item) { item.setId(id); return repository.save(item); }
    @DeleteMapping("/admin/menu-items/{id}") void delete(@PathVariable Long id) { repository.deleteById(id); }
}

@RestController
class AdminOrderController {
    private final OrderRepository orders;
    AdminOrderController(OrderRepository orders) { this.orders = orders; }
    @GetMapping("/admin/orders") List<Order> all() { return orders.findAll(); }
    @PutMapping("/admin/orders/{id}") Order update(@PathVariable Long id, @RequestBody Order order) { order.setId(id); return orders.save(order); }
}

@RestController
class AdminContentController {
    private final NewsArticleRepository news;
    private final MediaItemRepository media;
    AdminContentController(NewsArticleRepository news, MediaItemRepository media) { this.news = news; this.media = media; }
    @PostMapping("/admin/news") @ResponseStatus(HttpStatus.CREATED) NewsArticle createNews(@Valid @RequestBody NewsArticle item) { item.setId(null); return news.save(item); }
    @PutMapping("/admin/news/{id}") NewsArticle updateNews(@PathVariable Long id, @Valid @RequestBody NewsArticle item) { item.setId(id); return news.save(item); }
    @DeleteMapping("/admin/news/{id}") void deleteNews(@PathVariable Long id) { news.deleteById(id); }
    @PostMapping("/admin/media") @ResponseStatus(HttpStatus.CREATED) MediaItem createMedia(@Valid @RequestBody MediaItem item) { item.setId(null); return media.save(item); }
    @PutMapping("/admin/media/{id}") MediaItem updateMedia(@PathVariable Long id, @Valid @RequestBody MediaItem item) { item.setId(id); return media.save(item); }
    @DeleteMapping("/admin/media/{id}") void deleteMedia(@PathVariable Long id) { media.deleteById(id); }
}
