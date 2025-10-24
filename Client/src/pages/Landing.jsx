import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Container from '../components/Container';

const facts = [
  { title: 'Compounding power', text: 'Investing ₹10,000 monthly at 12% can grow to ~₹2.3 Crore in 25 years.' },
  { title: 'Expense tracking works', text: 'People who track expenses save 15–20% more on average.' },
  { title: 'Budgeting rule', text: '50/30/20 rule: Needs 50%, Wants 30%, Savings/Investments 20%.' },
  { title: 'Small leaks sink ships', text: 'Cutting a ₹150 daily habit saves ~₹54,750 a year.' },
];

export default function Landing() {
  return (
    <div>
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white to-ink-50" />
        <Container className="py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="heading text-4xl md:text-5xl leading-tight">Control your money. Build wealth with clarity.</h1>
              <p className="mt-4 text-ink-600 text-lg">Track expenses, visualize income, and manage lends/borrows effortlessly—all in one fluid, responsive dashboard.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/auth" className="btn-primary">Get started</Link>
                <Link to="/dashboard" className="btn-ghost">Live demo</Link>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-4">
                <div className="card-muted text-center">
                  <p className="heading text-2xl">₹0</p>
                  <p className="text-sm text-ink-600">Free to use</p>
                </div>
                <div className="card-muted text-center">
                  <p className="heading text-2xl">100%</p>
                  <p className="text-sm text-ink-600">Privacy first</p>
                </div>
                <div className="card-muted text-center">
                  <p className="heading text-2xl">24/7</p>
                  <p className="text-sm text-ink-600">Access</p>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-6 -z-10 bg-gradient-to-tr from-brand-200/50 to-transparent blur-2xl rounded-3xl" />
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-ink-500">This month</p>
                  <span className="text-success text-xs bg-success/10 px-2 py-1 rounded-full">On track</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-ink-50 rounded-xl p-4">
                    <p className="text-xs text-ink-600">Income</p>
                    <p className="heading text-xl mt-1">₹72,400</p>
                  </div>
                  <div className="bg-ink-50 rounded-xl p-4">
                    <p className="text-xs text-ink-600">Expense</p>
                    <p className="heading text-xl mt-1">₹48,120</p>
                  </div>
                  <div className="bg-ink-50 rounded-xl p-4">
                    <p className="text-xs text-ink-600">Len / Den</p>
                    <p className="heading text-xl mt-1">₹8,500</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </header>

      <section>
        <Container className="py-12 md:py-16">
          <h2 className="heading text-2xl md:text-3xl">Finance facts that matter</h2>
          <p className="text-ink-600 mt-2">Bite-sized insights to keep your motivation high.</p>
          <div className="mt-6 grid md:grid-cols-4 gap-4">
            {facts.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card">
                <p className="font-medium">{f.title}</p>
                <p className="text-sm text-ink-600 mt-2">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
