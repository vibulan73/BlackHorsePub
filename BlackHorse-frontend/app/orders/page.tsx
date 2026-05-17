import { PageBanner } from "../components/PageTitle";
import { api, MenuItem } from "../lib/api";
import { OrderForm } from "./OrderForm";
import { ScrollReveal } from "../components/ScrollReveal";
import { Car, Clock, Tag } from "lucide-react";

async function getMenu() {
  try {
    return await api<MenuItem[]>("/menu-items");
  } catch {
    return [];
  }
}

export default async function OrdersPage() {
  const items = await getMenu();
  const orderable = items.length ? items : [{ id: 1, name: "Sample Burger", price: 14, category: "Full Menu" }];

  return (
    <>
      <PageBanner 
        title="Online Orders" 
        copy="Order your favorites for pickup or delivery. Fast, easy, and delicious right to your door." 
        imageUrl="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=1920&q=80"
        badge="To-Go"
      />
      
      <section className="section">
        <div className="grid" style={{ marginBottom: '64px' }}>
          <ScrollReveal direction="up" delay={0}>
            <div className="glass-card" style={{ textAlign: 'center' }}>
              <div className="card-icon-wrap" style={{ margin: '0 auto 24px' }}><Car size={24} /></div>
              <h3 className="card-title">Fast Delivery</h3>
              <p className="card-desc">Quick and reliable delivery to your door or ready for pickup when you arrive.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={100}>
            <div className="glass-card" style={{ textAlign: 'center' }}>
              <div className="card-icon-wrap" style={{ margin: '0 auto 24px' }}><Clock size={24} /></div>
              <h3 className="card-title">Real-time Tracking</h3>
              <p className="card-desc">Track your order status from the kitchen straight to your table.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={200}>
            <div className="glass-card" style={{ textAlign: 'center' }}>
              <div className="card-icon-wrap" style={{ margin: '0 auto 24px' }}><Tag size={24} /></div>
              <h3 className="card-title">Special Deals</h3>
              <p className="card-desc">Exclusive discounts and combo deals available only for online orders.</p>
            </div>
          </ScrollReveal>
        </div>
        
        <ScrollReveal direction="up">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="section-header">
              <h2>Start Your Order</h2>
              <p>Select pickup or delivery and choose from our menu items.</p>
            </div>
            <OrderForm items={orderable} />
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
