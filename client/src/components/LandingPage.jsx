import React from 'react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="bg-[#F4F3EF] text-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute top-20 left-10 w-72 h-72 bg-[#B89F73] rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -10, 10, 0],
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-[#B89F73] rounded-full blur-3xl"
          />
        </motion.div>

        <motion.div 
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="relative max-w-7xl mx-auto text-center"
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Connect Your <span className="text-[#B89F73]">Campus</span> Community
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            Discover events, share notes, and connect with peers all in one place.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#B89F73] text-white font-semibold rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Join Now
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#B89F73', color: 'white' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-[#B89F73] text-[#B89F73] font-semibold rounded-full text-lg transition-all duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Quick Access Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <motion.div 
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="grid md:grid-cols-4 gap-8">
            {[
              { emoji: '📚', title: 'Services', description: 'Access campus services' },
              { emoji: '📝', title: 'Notes', description: 'Share and find study notes' },
              { emoji: '🎉', title: 'Events', description: 'Discover campus events' },
              { emoji: '👨‍🏫', title: 'Tutors', description: 'Connect with peer tutors' }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                className="bg-[#F4F3EF] p-6 rounded-2xl shadow-md text-center"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl mb-4"
                >
                  {item.emoji}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold text-center mb-12"
          >
            How It Works
          </motion.h2>
          <motion.div variants={fadeInUp} className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8">
            {[
              { number: '1', title: 'Post or Search', description: "Share your needs or find what you're looking for" },
              { number: '2', title: 'Connect', description: 'Engage with peers and resources' },
              { number: '3', title: 'Enjoy', description: 'Benefit from the campus community' }
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex flex-col items-center text-center"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 bg-[#B89F73] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4"
                >
                  {step.number}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <motion.div 
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold text-center mb-12"
          >
            Features
          </motion.h2>
          <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-8">
            {[
              { emoji: '🤝', title: 'Community Building', description: 'Foster connections and collaborations' },
              { emoji: '📅', title: 'Event Management', description: 'Organize and discover campus events easily' },
              { emoji: '🧠', title: 'Knowledge Sharing', description: 'Exchange notes and academic resources' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                className="bg-[#F4F3EF] p-6 rounded-2xl shadow-md"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl mb-4"
                >
                  {feature.emoji}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold text-center mb-12"
          >
            What Students Say
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <p className="text-xl italic text-gray-600 mb-4">
              "This platform has revolutionized how I engage with my campus community. It's now easier than ever to find study groups, share notes, and stay updated on events!"
            </p>
            <div className="flex items-center">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 bg-[#B89F73] rounded-full flex items-center justify-center text-white text-xl font-bold mr-4"
              >
                JS
              </motion.div>
              <div>
                <p className="font-semibold">Jane Smith</p>
                <p className="text-gray-600">Computer Science, Class of 2024</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Impact Section (replacing "Ready to Connect") */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#B89F73] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-6"
          >
            Making a Difference
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl mb-8"
          >
            Our platform is transforming campus life, fostering stronger communities, and enhancing the academic journey for students across the nation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { number: "10K+", label: "Active Users" },
              { number: "50+", label: "Partner Universities" },
              { number: "100K+", label: "Connections Made" }
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-4xl font-bold">{stat.number}</span>
                <span className="text-lg">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-6 text-gray-800"
          >
            Our Vision
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl mb-8 text-gray-600"
          >
            We envision a future where every student has the tools and connections they need to thrive academically and personally. By bridging the gap between students, resources, and opportunities, we're creating more vibrant and supportive campus communities.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, backgroundColor: '#B89F73', color: 'white' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-[#B89F73] font-semibold rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#B89F73]"
          >
            Learn More About Our Mission
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;