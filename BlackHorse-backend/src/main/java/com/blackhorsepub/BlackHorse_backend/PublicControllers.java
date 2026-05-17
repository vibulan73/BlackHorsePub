package com.blackhorsepub.BlackHorse_backend;

import jakarta.validation.Valid;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
class AuthController {
    private final AuthService authService;

    AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/auth/login")
    LoginResponse login(@Valid @RequestBody LoginRequest request) {
        try {
            return new LoginResponse(authService.login(request));
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, ex.getMessage());
        }
    }
}

@RestController
class EventController {
    private final EventRepository events;

    EventController(EventRepository events) {
        this.events = events;
    }

    @GetMapping("/events")
    List<Event> all(@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return date == null ? events.findAll() : events.findByDateOrderByTimeAsc(date);
    }

    @GetMapping("/events/featured")
    List<Event> featured() {
        return events.findByFeaturedTrueOrderByDateAscTimeAsc();
    }
}

@RestController
class OpenMicController {
    private final OpenMicEventRepository openMicEvents;
    private final OpenMicRegistrationRepository registrations;

    OpenMicController(OpenMicEventRepository openMicEvents, OpenMicRegistrationRepository registrations) {
        this.openMicEvents = openMicEvents;
        this.registrations = registrations;
    }

    @GetMapping("/open-mic/events")
    List<OpenMicEvent> upcoming() {
        return openMicEvents.findByDateGreaterThanEqualOrderByDateAsc(LocalDate.now());
    }

    @PostMapping("/open-mic/registrations")
    @ResponseStatus(HttpStatus.CREATED)
    OpenMicRegistration register(@Valid @RequestBody OpenMicRegistrationRequest request) {
        OpenMicEvent event = openMicEvents.findById(request.eventId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Open mic event not found"));
        if (event.getMaxParticipants() != null && registrations.countByEventId(event.getId()) >= event.getMaxParticipants()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Open mic session is full");
        }
        OpenMicRegistration registration = new OpenMicRegistration();
        registration.setUserName(request.userName());
        registration.setEmail(request.email());
        registration.setEvent(event);
        return registrations.save(registration);
    }
}

@RestController
class ReservationController {
    private static final List<String> SLOTS = List.of(
        "2:15 PM", "2:30 PM", "2:45 PM", "3:00 PM", "3:15 PM", "3:30 PM", "3:45 PM",
        "4:00 PM", "4:15 PM", "4:30 PM", "4:45 PM", "5:00 PM", "5:15 PM", "5:30 PM", "5:45 PM",
        "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"
    );
    private final ReservationRepository reservations;

    ReservationController(ReservationRepository reservations) {
        this.reservations = reservations;
    }

    @GetMapping("/reservations/slots")
    ReservationSlotsResponse slots(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<String> available = SLOTS.stream()
                .filter(slot -> !reservations.existsByDateAndTimeSlotAndStatus(date, slot, ReservationStatus.APPROVED))
                .toList();
        return new ReservationSlotsResponse(date, available);
    }

    @PostMapping("/reservations")
    @ResponseStatus(HttpStatus.CREATED)
    Reservation create(@Valid @RequestBody Reservation reservation) {
        reservation.setId(null);
        reservation.setStatus(ReservationStatus.PENDING);
        if (!SLOTS.contains(reservation.getTimeSlot())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unsupported time slot");
        }
        return reservations.save(reservation);
    }
}

@RestController
class CatalogController {
    private final BeerRepository beers;
    private final MenuItemRepository menuItems;
    private final NewsArticleRepository news;
    private final MediaItemRepository media;

    CatalogController(BeerRepository beers, MenuItemRepository menuItems, NewsArticleRepository news, MediaItemRepository media) {
        this.beers = beers;
        this.menuItems = menuItems;
        this.news = news;
        this.media = media;
    }

    @GetMapping("/beers")
    List<Beer> beers() { return beers.findAll(); }

    @GetMapping("/menu-items")
    List<MenuItem> menu(@RequestParam(required = false) String category) {
        return category == null ? menuItems.findAll() : menuItems.findByCategoryIgnoreCaseOrderByNameAsc(category);
    }

    @GetMapping("/news")
    List<NewsArticle> news() { return news.findAll(); }

    @GetMapping("/media")
    List<MediaItem> media() { return media.findAll(); }
}

@RestController
class OrderController {
    private final OrderRepository orders;
    private final MenuItemRepository menuItems;

    OrderController(OrderRepository orders, MenuItemRepository menuItems) {
        this.orders = orders;
        this.menuItems = menuItems;
    }

    @PostMapping("/orders")
    @ResponseStatus(HttpStatus.CREATED)
    Order create(@Valid @RequestBody Order order) {
        order.setId(null);
        BigDecimal total = BigDecimal.ZERO;
        for (OrderItem item : order.getItems()) {
            MenuItem menuItem = menuItems.findById(item.getItem().getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Menu item not found"));
            item.setItem(menuItem);
            item.setOrder(order);
            if (menuItem.getPrice() != null) {
                total = total.add(menuItem.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
            }
        }
        order.setTotalPrice(total);
        order.setStatus(OrderStatus.NEW);
        return orders.save(order);
    }
}

@RestController
class NewsletterController {
    private final NewsletterSubscriberRepository subscribers;

    NewsletterController(NewsletterSubscriberRepository subscribers) {
        this.subscribers = subscribers;
    }

    @PostMapping("/newsletter")
    NewsletterSubscriber subscribe(@Valid @RequestBody NewsletterRequest request) {
        return subscribers.findByEmailIgnoreCase(request.email())
                .orElseGet(() -> {
                    NewsletterSubscriber subscriber = new NewsletterSubscriber();
                    subscriber.setEmail(request.email());
                    return subscribers.save(subscriber);
                });
    }
}
