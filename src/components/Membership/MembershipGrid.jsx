"use client";

import { motion } from "framer-motion";
import MembershipCard from "./MembershipCard";
import "../css/membership/MembershipGrid.css";

export default function MembershipGrid({ memberships = [] }) {
  return (
    <section className="membership-grid-section">
      <div className="membership-grid-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
          className="membership-grid"
        >
          {memberships.map((plan, i) => (
            <motion.div
              key={plan.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <MembershipCard plan={plan} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
