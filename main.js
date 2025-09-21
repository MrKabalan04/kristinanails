import { createClient } from './supabase-config.js';
const supabase = createClient();

const container = document.getElementById("services-border");
let servicesMap = new Map();

// Render or update a single service row
function renderServiceRow(service) {
  servicesMap.set(service.id, service);

  let serviceElement = container.querySelector(`.services[data-id="${service.id}"]`);
  if (!serviceElement) {
    serviceElement = document.createElement('div');
    serviceElement.classList.add('services');
    serviceElement.dataset.id = service.id;
    container.appendChild(serviceElement);
  }

  // Use the exact same rendering logic as the admin panel
  // to ensure consistency and prevent errors.
  const lines = service.price.split("\n");
  let priceHTML = '';
  lines.forEach(line => {
    let [number, unit] = line.split("/");
    if (number) number = number.trim();
    if (unit) unit = unit.trim();
    priceHTML += `<div class="price-line"><span class="number">${number}</span><span class="unit">${unit ? '/' + unit : ''}</span></div>`;
  });

  serviceElement.innerHTML = `
    <div class="service-name">${service.name}</div>
    <div class="service-price">${priceHTML}</div>
  `;
}

// Remove a service row
function removeService(id) {
  servicesMap.delete(id);
  const serviceElement = container.querySelector(`.services[data-id="${id}"]`);
  if (serviceElement) serviceElement.remove();
}

// Fetch all services initially
async function fetchServices() {
  const { data, error } = await supabase
    .from('services')
    .select('id, name, price')
    .order('id', { ascending: true });

  if (error) return console.error(error);

  container.innerHTML = '';
  data.forEach(renderServiceRow);
}

// Subscribe to real-time changes
supabase.channel('public:services')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'services' }, payload => {
    renderServiceRow(payload.new);
  })
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'services' }, payload => {
    renderServiceRow(payload.new);
  })
  .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'services' }, payload => {
    removeService(payload.old.id);
  })
  .subscribe();

// Initial load
document.addEventListener('DOMContentLoaded', fetchServices);