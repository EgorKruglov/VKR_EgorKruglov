package org.example.user.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Данные для регистрации
    @Column(nullable = false, unique = true)
    private String email;
    private String phone;

    @Column(nullable = false, unique = true)
    private String password;

    // Данные компании
    private String companyName;
    private String companyShortName;
    private String inn;
    private String kpp;
    private String ogrn;
    private String legalAddress;
    private String actualAddress;

    // Банковские реквизиты
    private String bankAccount;
    private String bik;
    private String bankName;
    private String correspondentAccount;

    // Контактные лица
    private String contactPerson;
    private String contactPersonPosition;
    private String contactPhone;
    private String contactEmail;

    private String industry;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>(); // Инициализируем пустой список

    // Системные поля
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    private LocalDateTime updatedAt;

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public List<String> getRoles() {
        if (roles == null || roles.isEmpty()) {
            return List.of("ROLE_USER"); // Дефолтная роль для всех
        }
        return roles;
    }
}
