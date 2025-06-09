package org.example.order;

import org.example.order.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);

    List<Order> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);
}
