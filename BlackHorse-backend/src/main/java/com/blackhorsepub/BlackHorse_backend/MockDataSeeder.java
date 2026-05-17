package com.blackhorsepub.BlackHorse_backend;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class MockDataSeeder implements CommandLineRunner {
    private final boolean enabled;
    private final EventRepository events;
    private final OpenMicEventRepository openMicEvents;
    private final OpenMicRegistrationRepository openMicRegistrations;
    private final ReservationRepository reservations;
    private final BeerRepository beers;
    private final MenuItemRepository menuItems;
    private final OrderRepository orders;
    private final NewsArticleRepository newsArticles;
    private final MediaItemRepository mediaItems;
    private final NewsletterSubscriberRepository subscribers;

    public MockDataSeeder(
            @Value("${app.seed.mock-data:true}") boolean enabled,
            EventRepository events,
            OpenMicEventRepository openMicEvents,
            OpenMicRegistrationRepository openMicRegistrations,
            ReservationRepository reservations,
            BeerRepository beers,
            MenuItemRepository menuItems,
            OrderRepository orders,
            NewsArticleRepository newsArticles,
            MediaItemRepository mediaItems,
            NewsletterSubscriberRepository subscribers) {
        this.enabled = enabled;
        this.events = events;
        this.openMicEvents = openMicEvents;
        this.openMicRegistrations = openMicRegistrations;
        this.reservations = reservations;
        this.beers = beers;
        this.menuItems = menuItems;
        this.orders = orders;
        this.newsArticles = newsArticles;
        this.mediaItems = mediaItems;
        this.subscribers = subscribers;
    }

    @Override
    @Transactional
    public void run(String... args) {
        if (!enabled) {
            return;
        }

        seedEvents();
        seedOpenMic();
        seedReservations();
        seedBeers();
        seedMenuAndOrders();
        seedNews();
        seedMedia();
        seedNewsletter();
    }

    private void seedEvents() {
        if (events.count() > 0) return;
        events.saveAll(List.of(
                event("Friday Night Live: The Brass Lanterns", "A high-energy roots and soul set for the main room.", "2026-05-08", "20:00", "music", true),
                event("Saturday Stand-Up Showcase", "Local comics take the stage for a sharp late show.", "2026-05-09", "21:00", "comedy", true),
                event("Acoustic Sunday Sessions", "Laid-back acoustic sets with brunch specials.", "2026-05-10", "14:00", "music", false),
                event("Trivia Night", "Teams, prizes, and pub questions across food, music, and history.", "2026-05-13", "19:00", "trivia", false)));
    }

    private void seedOpenMic() {
        if (openMicEvents.count() == 0) {
            openMicEvents.saveAll(List.of(
                    openMic("Wednesday Open Mic", "Ten-minute performance slots. Music, poetry, comedy, and spoken word welcome.", "2026-05-06", 18),
                    openMic("Open Mic: Songwriters Round", "Original songs encouraged. Sign-in opens at 6:30 PM.", "2026-05-20", 14),
                    openMic("Comedy Open Mic", "Five-minute comedy slots with house host introductions.", "2026-06-03", 20)));
        }
        if (openMicRegistrations.count() > 0) return;
        List<OpenMicEvent> sessions = openMicEvents.findAll();
        if (sessions.isEmpty()) return;
        openMicRegistrations.saveAll(List.of(
                registration("Maya Fernando", "maya.fernando@example.com", sessions.get(0)),
                registration("Chris Nolan", "chris.nolan@example.com", sessions.get(0)),
                registration("Ari Silva", "ari.silva@example.com", sessions.get(Math.min(1, sessions.size() - 1))),
                registration("Nadia Perera", "nadia.perera@example.com", sessions.get(Math.min(2, sessions.size() - 1)))));
    }

    private void seedReservations() {
        if (reservations.count() > 0) return;
        reservations.saveAll(List.of(
                reservation("Emma Brooks", "emma.brooks@example.com", "+1 202 555 0101", "2026-05-08", "6:00 PM", 4, ReservationStatus.APPROVED),
                reservation("Daniel Carter", "daniel.carter@example.com", "+1 202 555 0102", "2026-05-08", "7:00 PM", 2, ReservationStatus.PENDING),
                reservation("Sofia Reed", "sofia.reed@example.com", "+1 202 555 0103", "2026-05-09", "8:00 PM", 6, ReservationStatus.APPROVED),
                reservation("Liam Stone", "liam.stone@example.com", "+1 202 555 0104", "2026-05-10", "6:00 PM", 3, ReservationStatus.REJECTED)));
    }

    private void seedBeers() {
        if (beers.count() > 0) return;
        beers.saveAll(List.of(
                beer("Black Horse House IPA", "IPA", "7.50", "Citrus-forward house IPA with a clean bitter finish."),
                beer("Old Town Lager", "Lager", "6.25", "Crisp, golden lager built for long pub evenings."),
                beer("Midnight Porter", "Porter", "8.00", "Roasted malt, cocoa, and a soft coffee finish."),
                beer("Summer Orchard Cider", "Cider", "6.75", "Dry apple cider with a bright, refreshing snap."),
                beer("Copper Rail Amber", "Amber Ale", "7.00", "Toasty malt backbone with light caramel notes.")));
    }

    private void seedMenuAndOrders() {
        if (menuItems.count() == 0) {
            menuItems.saveAll(List.of(
                    menuItem("Black Horse Burger", "Full Menu", "15.50", "House burger with cheddar, pub sauce, pickles, and fries."),
                    menuItem("Fish and Chips", "Full Menu", "17.00", "Beer-battered fish, thick-cut chips, tartar sauce, and lemon."),
                    menuItem("Loaded Pub Nachos", "Full Menu", "13.00", "Tortilla chips, cheese, jalapenos, salsa, sour cream, and scallions."),
                    menuItem("Caesar Salad", "Full Menu", "11.00", "Romaine, parmesan, croutons, and house Caesar dressing."),
                    menuItem("House Red Blend", "Wine List", "9.00", "Medium-bodied red with dark fruit and a peppery finish."),
                    menuItem("Sauvignon Blanc", "Wine List", "10.00", "Bright white wine with citrus and herbal notes."),
                    menuItem("Horse and Stormy", "Cocktails", "12.00", "Dark rum, ginger beer, lime, and aromatic bitters."),
                    menuItem("Smoked Old Fashioned", "Cocktails", "14.00", "Bourbon, bitters, orange, and a light smoke finish.")));
        }
        if (orders.count() > 0) return;
        List<MenuItem> items = menuItems.findAll();
        if (items.size() < 3) return;
        orders.saveAll(List.of(
                order("Olivia Martin", OrderType.PICKUP, OrderStatus.NEW, List.of(orderItem(items.get(0), 1), orderItem(items.get(2), 1))),
                order("Noah Wilson", OrderType.DELIVERY, OrderStatus.PREPARING, List.of(orderItem(items.get(1), 1), orderItem(items.get(Math.min(5, items.size() - 1)), 1))),
                order("Isabella Clark", OrderType.PICKUP, OrderStatus.READY, List.of(orderItem(items.get(Math.min(6, items.size() - 1)), 2)))));
    }

    private void seedNews() {
        if (newsArticles.count() > 0) return;
        newsArticles.saveAll(List.of(
                news("Black Horse Pub Announces Spring Entertainment Calendar", "The pub is adding more live music, comedy, and open mic dates through spring.", "https://example.com/black-horse-spring-calendar", "2026-04-22"),
                news("Local Tap List Gets a Seasonal Refresh", "Five rotating pours join the tap list, including a house IPA and a dry cider.", "https://example.com/black-horse-tap-refresh", "2026-04-28"),
                news("Neighborhood Open Mic Draws New Performers", "The weekly open mic continues to grow with musicians, comics, and poets.", "https://example.com/black-horse-open-mic", "2026-05-01")));
    }

    private void seedMedia() {
        if (mediaItems.count() > 0) return;
        mediaItems.saveAll(List.of(
                media("Main Room Live Set", "https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=1200&q=80", MediaType.IMAGE),
                media("Open Mic Crowd", "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80", MediaType.IMAGE),
                media("Performer Highlight Reel", "https://www.w3schools.com/html/mov_bbb.mp4", MediaType.VIDEO)));
    }

    private void seedNewsletter() {
        if (subscribers.count() > 0) return;
        subscribers.saveAll(List.of(
                subscriber("regular.one@example.com", "2026-04-20T18:00:00Z"),
                subscriber("events.fan@example.com", "2026-04-25T15:30:00Z"),
                subscriber("taplist.reader@example.com", "2026-05-01T11:15:00Z")));
    }

    private Event event(String title, String description, String date, String time, String category, boolean featured) {
        Event event = new Event();
        event.setTitle(title);
        event.setDescription(description);
        event.setDate(LocalDate.parse(date));
        event.setTime(LocalTime.parse(time));
        event.setCategory(category);
        event.setFeatured(featured);
        return event;
    }

    private OpenMicEvent openMic(String title, String description, String date, int maxParticipants) {
        OpenMicEvent event = new OpenMicEvent();
        event.setTitle(title);
        event.setDescription(description);
        event.setDate(LocalDate.parse(date));
        event.setMaxParticipants(maxParticipants);
        return event;
    }

    private OpenMicRegistration registration(String name, String email, OpenMicEvent event) {
        OpenMicRegistration registration = new OpenMicRegistration();
        registration.setUserName(name);
        registration.setEmail(email);
        registration.setEvent(event);
        return registration;
    }

    private Reservation reservation(String name, String email, String phone, String date, String slot, int partySize, ReservationStatus status) {
        Reservation reservation = new Reservation();
        reservation.setName(name);
        reservation.setEmail(email);
        reservation.setPhone(phone);
        reservation.setDate(LocalDate.parse(date));
        reservation.setTimeSlot(slot);
        reservation.setPartySize(partySize);
        reservation.setStatus(status);
        return reservation;
    }

    private Beer beer(String name, String type, String price, String description) {
        Beer beer = new Beer();
        beer.setName(name);
        beer.setType(type);
        beer.setPrice(new BigDecimal(price));
        beer.setDescription(description);
        return beer;
    }

    private MenuItem menuItem(String name, String category, String price, String description) {
        MenuItem item = new MenuItem();
        item.setName(name);
        item.setCategory(category);
        item.setPrice(new BigDecimal(price));
        item.setDescription(description);
        return item;
    }

    private Order order(String customerName, OrderType type, OrderStatus status, List<OrderItem> items) {
        Order order = new Order();
        order.setCustomerName(customerName);
        order.setType(type);
        order.setStatus(status);
        order.setItems(items);
        BigDecimal total = BigDecimal.ZERO;
        for (OrderItem item : items) {
            item.setOrder(order);
            total = total.add(item.getItem().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        }
        order.setTotalPrice(total);
        return order;
    }

    private OrderItem orderItem(MenuItem menuItem, int quantity) {
        OrderItem item = new OrderItem();
        item.setItem(menuItem);
        item.setQuantity(quantity);
        return item;
    }

    private NewsArticle news(String title, String content, String link, String date) {
        NewsArticle article = new NewsArticle();
        article.setTitle(title);
        article.setContent(content);
        article.setLink(link);
        article.setDate(LocalDate.parse(date));
        return article;
    }

    private MediaItem media(String title, String url, MediaType type) {
        MediaItem item = new MediaItem();
        item.setTitle(title);
        item.setUrl(url);
        item.setType(type);
        return item;
    }

    private NewsletterSubscriber subscriber(String email, String subscribedAt) {
        NewsletterSubscriber subscriber = new NewsletterSubscriber();
        subscriber.setEmail(email);
        subscriber.setSubscribedAt(Instant.parse(subscribedAt));
        return subscriber;
    }
}
