-- Mock data for the Black Horse Pub PostgreSQL database.
-- Run this after the Spring Boot app has created the schema.
--
-- Example:
-- psql -U postgres -d blackhorse -f src/main/resources/db/mock-data-postgres.sql

BEGIN;

TRUNCATE TABLE
    order_item,
    customer_order,
    open_mic_registration,
    open_mic_event,
    reservation,
    event,
    beer,
    menu_item,
    news_article,
    media_item,
    newsletter_subscriber
RESTART IDENTITY CASCADE;

INSERT INTO event (id, title, description, date, time, category, image_url, featured) VALUES
    (1, 'Friday Night Live: The Brass Lanterns', 'A high-energy roots and soul set for the main room.', '2026-05-08', '20:00:00', 'music', 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80', true),
    (2, 'Saturday Stand-Up Showcase', 'Local comics take the stage for a sharp late show.', '2026-05-09', '21:00:00', 'comedy', 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?auto=format&fit=crop&w=1200&q=80', true),
    (3, 'Acoustic Sunday Sessions', 'Laid-back acoustic sets with brunch specials.', '2026-05-10', '14:00:00', 'music', 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80', false),
    (4, 'Trivia Night', 'Teams, prizes, and pub questions across food, music, and history.', '2026-05-13', '19:00:00', 'trivia', 'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1200&q=80', false);

INSERT INTO open_mic_event (id, title, description, date, max_participants) VALUES
    (1, 'Wednesday Open Mic', 'Ten-minute performance slots. Music, poetry, comedy, and spoken word welcome.', '2026-05-06', 18),
    (2, 'Open Mic: Songwriters Round', 'Original songs encouraged. Sign-in opens at 6:30 PM.', '2026-05-20', 14),
    (3, 'Comedy Open Mic', 'Five-minute comedy slots with house host introductions.', '2026-06-03', 20);

INSERT INTO open_mic_registration (id, user_name, email, event_id) VALUES
    (1, 'Maya Fernando', 'maya.fernando@example.com', 1),
    (2, 'Chris Nolan', 'chris.nolan@example.com', 1),
    (3, 'Ari Silva', 'ari.silva@example.com', 2),
    (4, 'Nadia Perera', 'nadia.perera@example.com', 3);

INSERT INTO reservation (id, name, email, phone, date, time_slot, party_size, status) VALUES
    (1, 'Emma Brooks', 'emma.brooks@example.com', '+1 202 555 0101', '2026-05-08', '6:00 PM', 4, 'APPROVED'),
    (2, 'Daniel Carter', 'daniel.carter@example.com', '+1 202 555 0102', '2026-05-08', '7:00 PM', 2, 'PENDING'),
    (3, 'Sofia Reed', 'sofia.reed@example.com', '+1 202 555 0103', '2026-05-09', '8:00 PM', 6, 'APPROVED'),
    (4, 'Liam Stone', 'liam.stone@example.com', '+1 202 555 0104', '2026-05-10', '6:00 PM', 3, 'REJECTED');

INSERT INTO beer (id, name, type, price, description) VALUES
    (1, 'Black Horse House IPA', 'IPA', 7.50, 'Citrus-forward house IPA with a clean bitter finish.'),
    (2, 'Old Town Lager', 'Lager', 6.25, 'Crisp, golden lager built for long pub evenings.'),
    (3, 'Midnight Porter', 'Porter', 8.00, 'Roasted malt, cocoa, and a soft coffee finish.'),
    (4, 'Summer Orchard Cider', 'Cider', 6.75, 'Dry apple cider with a bright, refreshing snap.'),
    (5, 'Copper Rail Amber', 'Amber Ale', 7.00, 'Toasty malt backbone with light caramel notes.');

INSERT INTO menu_item (id, name, category, price, description, image_url) VALUES
    (1, 'Black Horse Burger', 'Full Menu', 15.50, 'House burger with cheddar, pub sauce, pickles, and fries.', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80'),
    (2, 'Fish and Chips', 'Full Menu', 17.00, 'Beer-battered fish, thick-cut chips, tartar sauce, and lemon.', 'https://images.unsplash.com/photo-1579208030886-b937da0925dc?auto=format&fit=crop&w=900&q=80'),
    (3, 'Loaded Pub Nachos', 'Full Menu', 13.00, 'Tortilla chips, cheese, jalapenos, salsa, sour cream, and scallions.', 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=900&q=80'),
    (4, 'Caesar Salad', 'Full Menu', 11.00, 'Romaine, parmesan, croutons, and house Caesar dressing.', 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=900&q=80'),
    (5, 'House Red Blend', 'Wine List', 9.00, 'Medium-bodied red with dark fruit and a peppery finish.', null),
    (6, 'Sauvignon Blanc', 'Wine List', 10.00, 'Bright white wine with citrus and herbal notes.', null),
    (7, 'Horse and Stormy', 'Cocktails', 12.00, 'Dark rum, ginger beer, lime, and aromatic bitters.', null),
    (8, 'Smoked Old Fashioned', 'Cocktails', 14.00, 'Bourbon, bitters, orange, and a light smoke finish.', null);

INSERT INTO customer_order (id, customer_name, type, total_price, status) VALUES
    (1, 'Olivia Martin', 'PICKUP', 30.50, 'NEW'),
    (2, 'Noah Wilson', 'DELIVERY', 29.00, 'PREPARING'),
    (3, 'Isabella Clark', 'PICKUP', 24.00, 'READY');

INSERT INTO order_item (id, order_id, item_id, quantity) VALUES
    (1, 1, 1, 1),
    (2, 1, 3, 1),
    (3, 2, 2, 1),
    (4, 2, 6, 1),
    (5, 3, 7, 2);

INSERT INTO news_article (id, title, content, link, date) VALUES
    (1, 'Black Horse Pub Announces Spring Entertainment Calendar', 'The pub is adding more live music, comedy, and open mic dates through spring.', 'https://example.com/black-horse-spring-calendar', '2026-04-22'),
    (2, 'Local Tap List Gets a Seasonal Refresh', 'Five rotating pours join the tap list, including a house IPA and a dry cider.', 'https://example.com/black-horse-tap-refresh', '2026-04-28'),
    (3, 'Neighborhood Open Mic Draws New Performers', 'The weekly open mic continues to grow with musicians, comics, and poets.', 'https://example.com/black-horse-open-mic', '2026-05-01');

INSERT INTO media_item (id, title, url, type) VALUES
    (1, 'Main Room Live Set', 'https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=1200&q=80', 'IMAGE'),
    (2, 'Open Mic Crowd', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80', 'IMAGE'),
    (3, 'Performer Highlight Reel', 'https://www.w3schools.com/html/mov_bbb.mp4', 'VIDEO');

INSERT INTO newsletter_subscriber (id, email, subscribed_at) VALUES
    (1, 'regular.one@example.com', '2026-04-20T18:00:00Z'),
    (2, 'events.fan@example.com', '2026-04-25T15:30:00Z'),
    (3, 'taplist.reader@example.com', '2026-05-01T11:15:00Z');

SELECT setval(pg_get_serial_sequence('event', 'id'), COALESCE((SELECT MAX(id) FROM event), 1), true);
SELECT setval(pg_get_serial_sequence('open_mic_event', 'id'), COALESCE((SELECT MAX(id) FROM open_mic_event), 1), true);
SELECT setval(pg_get_serial_sequence('open_mic_registration', 'id'), COALESCE((SELECT MAX(id) FROM open_mic_registration), 1), true);
SELECT setval(pg_get_serial_sequence('reservation', 'id'), COALESCE((SELECT MAX(id) FROM reservation), 1), true);
SELECT setval(pg_get_serial_sequence('beer', 'id'), COALESCE((SELECT MAX(id) FROM beer), 1), true);
SELECT setval(pg_get_serial_sequence('menu_item', 'id'), COALESCE((SELECT MAX(id) FROM menu_item), 1), true);
SELECT setval(pg_get_serial_sequence('customer_order', 'id'), COALESCE((SELECT MAX(id) FROM customer_order), 1), true);
SELECT setval(pg_get_serial_sequence('order_item', 'id'), COALESCE((SELECT MAX(id) FROM order_item), 1), true);
SELECT setval(pg_get_serial_sequence('news_article', 'id'), COALESCE((SELECT MAX(id) FROM news_article), 1), true);
SELECT setval(pg_get_serial_sequence('media_item', 'id'), COALESCE((SELECT MAX(id) FROM media_item), 1), true);
SELECT setval(pg_get_serial_sequence('newsletter_subscriber', 'id'), COALESCE((SELECT MAX(id) FROM newsletter_subscriber), 1), true);

COMMIT;
